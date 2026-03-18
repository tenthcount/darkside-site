# DARKSIDE PROMOTIONS — Website

## Stack
- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **CMS**: Sanity.io (headless CMS)
- **Hosting**: Vercel (recommended) or Cloudflare Pages
- **Domain**: darksidepromos.com

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ozwya2q1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

### 3. Run Locally
```bash
npm run dev
```
Site runs at `http://localhost:3000`

### 4. Deploy to Vercel
1. Push to GitHub
2. Go to vercel.com → Import project → Select repo
3. Add environment variables in Vercel dashboard
4. Deploy

### 5. Sanity Studio (Content Management)
To manage content, go to sanity.io/manage → your project → Studio
Or deploy the embedded studio (instructions at sanity.io/docs)

---

## Content Types (Sanity)

| Type | What It Does |
|------|-------------|
| **Event** | Fight cards, flyers, banners, ticket links, dates |
| **Fighter** | Profiles, photos, records, bios, fight history |
| **Sponsor** | Logos, names, website links |
| **Gallery Item** | Photos and YouTube video embeds |
| **Site Settings** | Social links, contact info, hero text |

---

## Updating Content

### New Event
1. Log into Sanity Studio
2. Create new Event document
3. Fill in name, date, venue, upload flyer/banner
4. Add fight card entries
5. Toggle "Featured" ON (toggle OFF on old event)
6. Publish → site updates within 60 seconds

### New Fighter
1. Create new Fighter document
2. Add name, photo, record, weight class, bio
3. Set Display Order number
4. Publish

### Gallery
1. Create new Gallery Item
2. Choose Photo or Video
3. Upload image or paste YouTube URL
4. Add tags and event name
5. Publish

---

## File Structure
```
src/
  app/
    page.tsx          → Homepage
    layout.tsx        → Root layout
    globals.css       → Global styles
    fighters/
      page.tsx        → Fighters listing
      [slug]/
        page.tsx      → Individual fighter profile
    gallery/
      page.tsx        → Media gallery
  components/
    Navbar.tsx
    Footer.tsx
    Countdown.tsx
    Reveal.tsx
    VideoEmbed.tsx
  lib/
    sanity.ts         → Sanity client & queries
  sanity/
    schemas/          → Content type definitions
public/
  DSP_Logo.svg        → Logo file
```
