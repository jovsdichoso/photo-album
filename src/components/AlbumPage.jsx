import PageLayout from './PageLayout'

export default function AlbumPage({ pageData, side, pageNumber }) {
  const isLeft = side === 'left'

  return (
    <div
      // Using the upgraded page-paper class from your index.css
      className="relative overflow-hidden page-paper"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* 1. Content Layer (Bottom) */}
      <div className="absolute inset-0 z-0">
        {pageData ? (
          <PageLayout layout={pageData.layout} photos={pageData.photos} side={side} />
        ) : (
          // Blank end page
          <div className="w-full h-full" />
        )}
      </div>

      {/* 2. 3D Physical Spine & Edge Layer (Top - Sits above photos) */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          // Deep crease at the spine, bright highlight on outer edges
          boxShadow: isLeft
            ? 'inset -45px 0 50px -15px rgba(0,0,0,0.65), inset 2px 0 4px rgba(255,255,255,0.45)'
            : 'inset 45px 0 50px -15px rgba(0,0,0,0.65), inset -2px 0 4px rgba(255,255,255,0.45)',
          // Simulates the physical curve of the page rolling into the binding
          background: isLeft
            ? 'linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 12%, transparent 30%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 12%, transparent 30%)',
        }}
      />

      {/* 3. Page Number Layer */}
      {pageNumber && (
        <div
          className="absolute bottom-4 pointer-events-none z-50"
          style={{
            [isLeft ? 'left' : 'right']: '18px',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(90,65,40,0.6)', // Darkened slightly so it's readable over photos
            textShadow: '0 1px 2px rgba(255,255,255,0.5)', // Subtle glow to separate it from dark backgrounds
          }}
        >
          {pageNumber}
        </div>
      )}
    </div>
  )
}