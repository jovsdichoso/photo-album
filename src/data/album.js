/**
 * Album data configuration.
 *
 * To use Cloudinary later, replace local paths with Cloudinary URLs:
 * e.g. "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/album/photo.jpg"
 *
 * To connect to Supabase later, fetch this data from a Supabase table
 * and replace the static export with a dynamic fetch in a hook or context.
 */

export const albumData = {
  title: "A Summer to Remember",
  coverImage: "/images/cover.jpg",

  pages: [
    {
      id: 1,
      layout: "full",           // One full-bleed photo
      photos: [
        { src: "/images/page1/1.jpg", alt: "" }
      ]
    },
    {
      id: 2,
      layout: "two-landscape",  // Two stacked landscape photos
      photos: [
        { src: "/images/page2/1.jpg", alt: "" },
        { src: "/images/page2/2.jpg", alt: "" }
      ]
    },
    {
      id: 3,
      layout: "four-polaroid",  // Four polaroid-style prints
      photos: [
        { src: "/images/page3/1.jpg", alt: "" },
        { src: "/images/page3/2.jpg", alt: "" },
        { src: "/images/page3/3.jpg", alt: "" },
        { src: "/images/page3/4.jpg", alt: "" }
      ]
    },
    {
      id: 4,
      layout: "collage",        // Overlapping prints collage
      photos: [
        { src: "/images/page4/1.jpg", alt: "" },
        { src: "/images/page4/2.jpg", alt: "" },
        { src: "/images/page4/3.jpg", alt: "" }
      ]
    },
    {
      id: 5,
      layout: "full",
      photos: [
        { src: "/images/page5/1.jpg", alt: "" }
      ]
    },
    {
      id: 6,
      layout: "two-landscape",
      photos: [
        { src: "/images/page1/1.jpg", alt: "" },
        { src: "/images/page3/2.jpg", alt: "" }
      ]
    },
    {
      id: 7,
      layout: "four-polaroid",
      photos: [
        { src: "/images/page2/1.jpg", alt: "" },
        { src: "/images/page4/2.jpg", alt: "" },
        { src: "/images/page5/1.jpg", alt: "" },
        { src: "/images/page3/1.jpg", alt: "" }
      ]
    },
    {
      id: 8,
      layout: "full",
      photos: [
        { src: "/images/page4/1.jpg", alt: "" }
      ]
    }
  ],

  music: {
    src: "/music/background.mp3",
    loop: true
  }
}
