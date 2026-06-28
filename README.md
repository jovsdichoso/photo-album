# Photo Album

A cinematic, interactive photo album web application built with React + Vite.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Adding Your Photos

Drop your photos into the matching folders inside `public/images/`:

```
public/
  images/
    cover.jpg           ← Album cover image
    page1/
      1.jpg             ← Full-page photo
    page2/
      1.jpg             ← Top landscape photo
      2.jpg             ← Bottom landscape photo
    page3/
      1.jpg  2.jpg      ← Polaroid grid (4 photos)
      3.jpg  4.jpg
    page4/
      1.jpg  2.jpg  3.jpg  ← Collage layout
    page5/
      1.jpg             ← Full-page photo
  music/
    background.mp3      ← Background music
```

You can use any image format supported by browsers (jpg, png, webp).

---

## Adding More Pages

Edit `src/data/album.js` and add entries to the `pages` array.

Available layouts:
- `"full"` — single full-bleed photo (needs 1 photo)
- `"two-landscape"` — two stacked photos (needs 2 photos)
- `"four-polaroid"` — 2×2 polaroid grid (needs 4 photos)
- `"collage"` — overlapping prints (needs 3 photos)

Example:
```js
{
  id: 9,
  layout: "two-landscape",
  photos: [
    { src: "/images/page9/1.jpg", alt: "" },
    { src: "/images/page9/2.jpg", alt: "" }
  ]
}
```

---

## Adding Your Music

Replace `public/music/background.mp3` with your own MP3 file.
The music starts after the album opens and can be toggled with the button in the bottom-right corner.

---

## Future: Cloudinary Integration

To replace local images with Cloudinary, update `src/data/album.js`:

```js
{ src: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/album/photo.jpg" }
```

No frontend component changes needed — only the `src` values in `album.js`.

---

## Future: Supabase Integration

Create a `src/hooks/useAlbumData.js` hook that fetches pages from a Supabase table and replaces the static import of `albumData` in `App.jsx`. The component tree doesn't need to change.

---

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- react-pageflip

---

## Project Structure

```
src/
  components/
    Album.jsx           ← Book viewer with page flip
    AlbumPage.jsx       ← Single page wrapper
    BookCover.jsx       ← Closed album visual
    MusicToggle.jsx     ← Music button
    OpeningAnimation.jsx← Intro sequence
    PageLayout.jsx      ← Photo layout engine
  data/
    album.js            ← All content configuration
  hooks/
    useMusic.js         ← Audio playback hook
  App.jsx
  main.jsx
  index.css
public/
  images/               ← Your photos go here
  music/                ← Your MP3 goes here
```
