# Next.js Telegram Media Admin Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the A² portfolio site from Vite React to Next.js and add Telegram/n8n-powered media and booking administration without a traditional CMS.

**Architecture:** Next.js App Router serves the public site, reads published media from a database/storage layer, and sends booking requests to n8n/Telegram. Telegram remains the admin interface; n8n can orchestrate bot commands, file ingestion, YouTube links, and notifications. The site should not embed heavy videos by default; it renders optimized thumbnails and opens YouTube/cloud links on demand.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Supabase Postgres, Supabase Storage, Supabase JavaScript client, Telegram Bot API, n8n Webhook/Telegram nodes, YouTube links for videos.

---

## Key Decisions

- Keep Prism for the hero, but return it as an optimized progressive enhancement, not as an always-on full-screen WebGL layer.
- Use Telegram as the admin UI, not as the primary public media CDN.
- Store media metadata in a database.
- Use Supabase Postgres for media metadata, booking requests, and Telegram admin IDs.
- Use Supabase Storage for uploaded photos and generated/selected thumbnails.
- Store videos as YouTube URLs first. Do not self-host concert video files unless there is a clear reason.
- Use n8n for Telegram workflows and notifications where possible.
- Keep the public site fast: thumbnails first, lazy embeds/links second.
- Keep Supabase access server-side for writes. Public reads can use a safe API route or public bucket URLs depending on RLS/storage policy.
- Open YouTube videos in an on-site modal iframe after user click.
- Use public-read Supabase Storage buckets for launch simplicity.

## Recommended Deployment Shape

### Option A: Vercel + n8n + Supabase

Selected for production.

- Vercel hosts Next.js.
- Self-hosted n8n handles Telegram bot workflows and booking notifications.
- Supabase Postgres stores dynamic records: media metadata, booking requests, Telegram admins.
- Supabase Storage stores managed gallery photos and thumbnails. 500GB is enough for the expected portfolio/media workload if videos remain on YouTube.
- YouTube hosts videos.
- Static/front-loaded content remains in the frontend: copy, section layout, brand presentation, default fallback media, hero content, repertoire text.

Tradeoff: Vercel + Supabase stay managed, while n8n remains under owner control. This is the best balance for launch.

### Option B: Self-host everything later

Best if full control is more important than operational simplicity.

- VPS hosts Next.js with Node process manager or Docker.
- VPS hosts n8n.
- VPS hosts PostgreSQL.
- VPS hosts S3-compatible storage via MinIO, or stores files behind Nginx.

Tradeoff: full control, but backups, security, TLS, file storage, monitoring, and updates become your responsibility.

### Recommendation

Use Option A now: Vercel + self-hosted n8n + Supabase. Keep integration points environment-variable based so the app can later move from Vercel to a self-hosted Next.js server while keeping Supabase unchanged.

## Static vs Dynamic Content Boundary

Keep these in frontend code/content files:

- Hero logo, title, tagline, booking CTA.
- About text from the PDF.
- Member biographies.
- Repertoire and format sections.
- Footer/legal/static contact labels.
- Fallback gallery/video items for local development.

Manage these through Telegram/n8n/Supabase:

- Gallery photos.
- Gallery ordering and visibility.
- YouTube video cards.
- Video ordering and visibility.
- Booking requests.
- Optional public cloud-material links.

Do not build a full text CMS unless the static sections need frequent editing. This keeps the system smaller and less fragile.

## MVP Admin Goal

The practical goal is simple: avoid editing code when adding new gallery content.

Admin must be able to do these from Telegram:

- Add a photo to the gallery.
- Add a YouTube video to the video section.
- Hide or publish an item.
- Delete or archive an item.
- Change basic title/caption/order if needed.

Everything else can stay in frontend code until there is a real need to edit it often.

## Telegram UX MVP

### Add photo

Admin flow:

1. Admin sends `/add_photo`.
2. Bot replies: `Пришлите фото для галереи`.
3. Admin sends photo.
4. Bot replies: `Название? Напишите текст или /skip`.
5. Admin sends title or `/skip`.
6. Bot uploads photo to Supabase Storage bucket `media-photos`.
7. Bot creates `media_items` row with `type = photo`, `is_published = true`.
8. Bot replies with preview and ID: `Фото добавлено: <id>`.

### Add YouTube video

Admin flow:

1. Admin sends `/add_video`.
2. Bot replies: `Пришлите ссылку YouTube`.
3. Admin sends URL.
4. Bot extracts `youtubeId` and thumbnail.
5. Bot replies: `Название? Напишите текст или /skip`.
6. Bot creates `media_items` row with `type = youtube`, `provider = youtube`, `media_url = original URL`, `thumbnail_url = YouTube thumbnail`, `is_published = true`.
7. Bot replies with preview and ID: `Видео добавлено: <id>`.

### Manage items

Commands:

- `/media` shows latest 10 items with IDs, type, title, publish status.
- `/hide <id>` hides item from site.
- `/publish <id>` shows item on site.
- `/delete <id>` archives item or removes row after confirmation.
- `/move <id> <number>` changes sort order.

Use soft delete/hide first. Hard delete from Supabase Storage can be added later.

## Supabase Setup

### Project

- Create one Supabase project for production.
- Optional: create a second Supabase project for staging before Telegram workflows become active.
- Store server-only keys only in Vercel/server/n8n credentials, never in client-side code.

### Storage buckets

Create these buckets:

- `media-photos` for gallery photos.
- `media-thumbnails` for video thumbnails and optional generated photo thumbnails.

Recommended first version:

- Buckets are public read to simplify image delivery.
- Writes happen only through n8n or Next.js admin endpoints using server-side credentials.
- If private buckets are required later, serve signed URLs from Next.js route handlers.

### Tables SQL

```sql
create extension if not exists "pgcrypto";

create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('photo', 'youtube', 'cloud_link')),
  title text not null,
  description text,
  alt text,
  thumbnail_url text not null,
  media_url text not null,
  provider text not null default 'supabase' check (provider in ('supabase', 'youtube', 'cloud')),
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  event_date date,
  event_type text,
  message text not null,
  materials_url text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done')),
  created_at timestamptz not null default now()
);

create table public.telegram_admins (
  id uuid primary key default gen_random_uuid(),
  telegram_user_id text not null unique,
  display_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index media_items_public_order_idx on public.media_items (is_published, sort_order, created_at desc);
create index booking_requests_status_created_idx on public.booking_requests (status, created_at desc);
```

### Telegram admin seed data

Initial production admin whitelist:

```sql
insert into public.telegram_admins (telegram_user_id, display_name, is_active)
values
  ('113357472', 'Admin 1', true),
  ('417307015', 'Admin 2', true)
on conflict (telegram_user_id) do update set
  is_active = excluded.is_active,
  display_name = excluded.display_name;
```

n8n and Next.js admin endpoints must reject Telegram commands from any user ID not present in `telegram_admins` with `is_active = true`.

### RLS policy

Recommended first version:

- Enable RLS on all tables.
- Public clients do not write directly.
- Next.js/n8n use server-side service role for writes.
- Keep table reads server-side and expose `/api/media` from Next.js.
- Supabase Storage buckets are public-read, but table writes and bucket writes remain server/n8n-only.

Use the simpler alternative first: `/api/media` reads published rows server-side and returns only public fields.

## Data Model

### media_items

```ts
type MediaItem = {
  id: string;
  type: 'photo' | 'youtube' | 'cloud_link';
  title: string;
  description?: string;
  alt?: string;
  thumbnailUrl: string;
  mediaUrl: string;
  provider?: 'supabase' | 'youtube' | 'cloud';
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};
```

### booking_requests

```ts
type BookingRequest = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  eventType?: string;
  message: string;
  materialsUrl?: string;
  status: 'new' | 'in_progress' | 'done';
  createdAt: string;
};
```

### telegram_admins

```ts
type TelegramAdmin = {
  id: string;
  telegramUserId: string;
  displayName?: string;
  isActive: boolean;
};
```

## Public Site Behavior

- Gallery reads only `media_items` where `type = photo` and `isPublished = true`.
- Video section reads `type = youtube` and `isPublished = true`.
- Cloud links can appear in a separate “Материалы” section or as button links in video/gallery cards.
- Photo click opens a lightbox with keyboard, close, next, previous, and mobile-friendly controls.
- Video click opens a modal iframe embed only after user interaction.
- The iframe is destroyed when the modal closes so YouTube playback and network activity stop.
- Booking form submits to a Next.js route handler, persists the request, then calls n8n webhook.

## n8n Workflows

### Workflow 1: Booking Notification

Trigger: Next.js calls n8n production webhook with JSON.

Steps:
1. Webhook node receives booking payload.
2. Validate shared secret header.
3. Telegram node sends formatted message to admin chat.
4. Optional: add inline buttons for status changes later.
5. Respond to webhook with success.

Payload example:

```json
{
  "type": "booking_request",
  "name": "Анна",
  "email": "anna@example.com",
  "phone": "+79991234567",
  "eventDate": "2026-06-01",
  "eventType": "Корпоратив",
  "message": "Нужен сет welcome",
  "materialsUrl": "https://cloud.example.com/a2-materials"
}
```

### Workflow 2: Add Photo

Trigger: Telegram Bot receives `/add_photo` and a photo/file.

Steps:
1. Verify `telegramUserId` is allowed.
2. Get Telegram file with Telegram node `File -> Get` and `Download = true`.
3. Upload binary file to storage.
4. Create `media_items` record through Next.js admin API or direct DB node.
5. Reply with preview and status.

### Workflow 3: Add YouTube Video

Trigger: Telegram Bot receives `/add_video` and a YouTube URL.

Steps:
1. Verify admin.
2. Extract YouTube video ID.
3. Build thumbnail URL or ask admin to upload a custom thumbnail.
4. Create `media_items` record with `type = youtube`.
5. Reply with preview.

### Workflow 4: List/Delete/Publish Media

Commands:
- `/media` lists latest items with IDs.
- `/delete <id>` deletes or unpublishes an item.
- `/publish <id>` sets `isPublished = true`.
- `/hide <id>` sets `isPublished = false`.
- `/move <id> <sortOrder>` changes order.

Prefer soft delete/unpublish over hard delete initially.

## Next.js Migration Tasks

### Task 1: Create Next.js App Router structure

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Move/adapt: `src/app/App.tsx` into page-level composition
- Move/adapt: `src/app/components/*` into `components/*` or keep under `src/components/*`
- Modify: `package.json`
- Modify: `tsconfig.json`

**Steps:**
1. Install Next.js dependencies.
2. Replace Vite scripts with `next dev`, `next build`, `next start`.
3. Create `app/layout.tsx` with metadata and global styles.
4. Create `app/page.tsx` that renders the existing sections.
5. Ensure client components have `'use client'` where they use motion, refs, hooks, browser APIs, forms, or event handlers.
6. Run `npm run build`.

Context7 notes:
- App Router route handlers live in `app/**/route.ts`.
- POST handlers can parse JSON with `await request.json()`.
- Server components can fetch dynamic data with `{ cache: 'no-store' }` or ISR with `next: { revalidate: 60 }`.

### Task 2: Add Supabase client and media API contract

**Files:**
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/media.ts`
- Create: `src/lib/types.ts`
- Create: `app/api/media/route.ts`

**Steps:**
1. Install `@supabase/supabase-js`.
2. Define `MediaItem` type.
3. Create a server Supabase client using `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Add `GET /api/media` returning published items from `media_items` ordered by `sort_order` and `created_at`.
5. Add temporary fallback seed data matching current gallery/video if Supabase env vars are absent in local development.
6. Update `Gallery` and `Video` to consume props/data instead of hardcoded arrays.
7. Run build.

Context7 Supabase notes:
- The Supabase JavaScript client can be created server-side with `createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)`.
- Supabase Storage supports signed upload URLs with `createSignedUploadUrl` and direct uploads with `uploadToSignedUrl`.
- For remote images in Next.js, use `next/image` with explicit `width` and `height`.

### Task 3: Add gallery lightbox

**Files:**
- Create: `components/GalleryLightbox.tsx`
- Modify: `components/Gallery.tsx`

**Steps:**
1. Add clickable photo cards using `<button>` or accessible anchor behavior.
2. Add modal with close, previous, next.
3. Add `Escape` key handling.
4. Add `aria-modal`, labels, and focus handling.
5. Keep images lazy-loaded except active image.
6. Run browser smoke test on mobile and desktop.

### Task 3b: Add YouTube modal player

**Files:**
- Create: `components/VideoModal.tsx`
- Modify: `components/Video.tsx`

**Steps:**
1. Add `youtubeId` field to the media item mapping for `type = youtube`.
2. Render video cards as buttons, not direct iframe embeds.
3. On click, open `VideoModal` with iframe `src="https://www.youtube.com/embed/{youtubeId}?autoplay=1&rel=0"`.
4. Add close button with `aria-label="Закрыть видео"`.
5. Add `Escape` key handling.
6. Add backdrop click close.
7. Destroy iframe on close by unmounting the modal.
8. Ensure modal does not render iframe during initial page load.
9. Run browser smoke test and confirm Network panel does not load YouTube before click.

### Task 4: Add booking route handler

**Files:**
- Create: `app/api/booking/route.ts`
- Create: `src/lib/booking.ts`
- Modify: `components/Contact.tsx`

**Steps:**
1. Add form fields: name, phone, email, event date, event type, message, materials URL.
2. Validate required fields server-side.
3. Save request to Supabase `booking_requests`.
4. POST to `N8N_BOOKING_WEBHOOK_URL` with `N8N_WEBHOOK_SECRET` header.
5. Return JSON status.
6. Show success/error states in the form.

### Task 5: Add admin media endpoints for n8n

**Files:**
- Create: `app/api/admin/media/route.ts`
- Create: `app/api/admin/media/[id]/route.ts`
- Create: `src/lib/admin-auth.ts`

**Steps:**
1. Require shared secret header from n8n.
2. Add create media endpoint that inserts into Supabase `media_items`.
3. Add update/publish/hide/delete endpoint that updates Supabase rows.
4. Add reorder endpoint if needed.
5. Add optional endpoint for signed Supabase Storage upload URLs if n8n should upload through Next.js instead of using Supabase credentials directly.
6. Add tests or request scripts for each endpoint.

### Task 6: Connect n8n workflows

**Files:**
- Create: `docs/n8n/booking-workflow.md`
- Create: `docs/n8n/media-admin-workflow.md`

**Steps:**
1. Create n8n production webhook for booking.
2. Create Telegram workflow for incoming bot messages.
3. Add admin user ID whitelist.
4. Connect media workflow to Next.js admin endpoints or Supabase nodes.
5. For photo uploads, use Telegram `File -> Get` with download enabled, then upload binary to Supabase Storage bucket `media-photos`.
6. Insert the created public URL into `media_items`.
7. Test `/add_video` with YouTube URL and save extracted `youtubeId` plus thumbnail URL.
8. Test `/add_photo` with a small image.
9. Test `/hide` and `/publish`.

### Task 7: Return optimized Prism hero

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Prism.jsx`
- Optional Create: `components/HeroPrism.tsx`

**Steps:**
1. Render Prism only after client mount.
2. Disable Prism when `prefers-reduced-motion` is active.
3. Use IntersectionObserver to stop render loop when hero is offscreen.
4. Cap DPR to `1` or `1.25` for Prism canvas.
5. Use CSS fallback before Prism loads.
6. Keep Prism enabled on modern phones if performance remains good.
7. Verify on desktop, mobile, and throttled CPU.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_MEDIA_PHOTOS_BUCKET=media-photos
SUPABASE_MEDIA_THUMBNAILS_BUCKET=media-thumbnails
N8N_BOOKING_WEBHOOK_URL=
N8N_MEDIA_WEBHOOK_SECRET=
N8N_BOOKING_WEBHOOK_SECRET=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
TELEGRAM_ADMIN_USER_IDS=113357472,417307015
```

## Acceptance Criteria

- Public site runs on Next.js.
- Gallery items come from Supabase-backed data layer, not hardcoded component arrays.
- Photo click opens a working lightbox.
- Video cards open YouTube modal iframes and do not load YouTube embeds until user interaction.
- Booking form submits to backend and triggers Telegram notification through n8n.
- Telegram admin can add/hide/publish/delete media backed by Supabase rows and Storage objects.
- Supabase Storage buckets are public-read for launched media files.
- Prism is restored without making desktop unusable.
- Build passes with `npm run build`.
- Browser console has no errors on homepage load.

## Open Questions

No open product questions remain. Before production, verify that Telegram IDs `113357472` and `417307015` are the intended admins in the target bot chat.
