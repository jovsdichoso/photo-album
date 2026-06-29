import PageLayout from './PageLayout'

export default function AlbumPage({ pageData, side, pageNumber }) {
  const isLeft = side === 'left'

  return (
    <div
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
          <div className="w-full h-full" />
        )}
      </div>

      {/* 2. 3D Physical Spine & Edge Layer (Top - Sits above photos) */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          // Responsive shadow: Scales down on mobile so it doesn't swallow the page
          boxShadow: isLeft
            ? 'inset clamp(-45px, -6vw, -20px) 0 clamp(20px, 8vw, 50px) clamp(-15px, -2vw, -5px) rgba(0,0,0,0.65), inset 2px 0 4px rgba(255,255,255,0.45)'
            : 'inset clamp(20px, 6vw, 45px) 0 clamp(20px, 8vw, 50px) clamp(-15px, -2vw, -5px) rgba(0,0,0,0.65), inset -2px 0 4px rgba(255,255,255,0.45)',
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
            // Responsive positioning for the page numbers
            [isLeft ? 'left' : 'right']: 'clamp(12px, 3vw, 18px)',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(9px, 1.5vw, 11px)',
            letterSpacing: '0.15em',
            color: 'rgba(90,65,40,0.6)',
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
          }}
        >
          {pageNumber}
        </div>
      )}
    </div>
  )
}