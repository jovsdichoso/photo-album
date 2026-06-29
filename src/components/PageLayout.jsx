import { useState } from 'react'

function Photo({ src, alt, className = '', style = {}, sizeClass = 'photo-print' }) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className={`${className} ${sizeClass} bg-warmtan/30`}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '40%', height: '40%', opacity: 0.2 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${sizeClass} object-cover`}
      style={style}
      onError={() => setError(true)}
    />
  )
}

export default function PageLayout({ layout, photos, side }) {
  switch (layout) {
    case 'full':
      return (
        <div className="w-full h-full relative overflow-hidden">
          <Photo
            src={photos[0]?.src}
            alt={photos[0]?.alt}
            className="w-full h-full"
            sizeClass=""
            style={{ boxShadow: 'none' }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.18) 100%)',
            }}
          />
        </div>
      )

    case 'two-landscape':
      return (
        <div 
          className="w-full h-full flex flex-col justify-center"
          style={{ padding: '6%', gap: '5%' }}
        >
          <Photo
            src={photos[0]?.src}
            alt={photos[0]?.alt}
            className="w-full flex-1 rounded-sm"
            sizeClass="photo-print"
            style={{ minHeight: 0 }}
          />
          <Photo
            src={photos[1]?.src}
            alt={photos[1]?.alt}
            className="w-full flex-1 rounded-sm"
            sizeClass="photo-print"
            style={{ minHeight: 0 }}
          />
        </div>
      )

    case 'four-polaroid': {
      const rotations = ['-2deg', '1.5deg', '-1deg', '2.5deg']
      return (
        <div 
          className="w-full h-full grid grid-cols-2 place-items-center"
          style={{ padding: '5%', gap: '4%' }}
        >
          {photos.slice(0, 4).map((photo, i) => (
            <div
              key={i}
              className="w-full"
              style={{
                transform: `rotate(${rotations[i]})`,
                transition: 'transform 0.3s ease',
              }}
            >
              <Photo
                src={photo.src}
                alt={photo.alt}
                className="w-full aspect-square rounded-sm"
                sizeClass="photo-print-sm"
              />
            </div>
          ))}
        </div>
      )
    }

    case 'collage': {
      return (
        <div className="w-full h-full relative" style={{ padding: '6%' }}>
          {/* Background large photo */}
          <Photo
            src={photos[0]?.src}
            alt={photos[0]?.alt}
            className="absolute rounded-sm"
            sizeClass="photo-print"
            style={{
              top: '8%',
              left: '8%',
              width: '70%',
              height: '60%',
              transform: 'rotate(-1.5deg)',
              objectFit: 'cover',
            }}
          />
          {/* Middle photo */}
          <Photo
            src={photos[1]?.src}
            alt={photos[1]?.alt}
            className="absolute rounded-sm"
            sizeClass="photo-print"
            style={{
              bottom: '10%',
              left: '20%',
              width: '55%',
              height: '45%',
              transform: 'rotate(2deg)',
              objectFit: 'cover',
              zIndex: 2,
            }}
          />
          {/* Accent photo */}
          <Photo
            src={photos[2]?.src}
            alt={photos[2]?.alt}
            className="absolute rounded-sm"
            sizeClass="photo-print"
            style={{
              top: '20%',
              right: '4%',
              width: '38%',
              height: '32%',
              transform: 'rotate(3deg)',
              objectFit: 'cover',
              zIndex: 3,
            }}
          />
        </div>
      )
    }

    default:
      return (
        <div className="w-full h-full flex items-center justify-center" style={{ padding: '6%' }}>
          <Photo src={photos[0]?.src} alt={photos[0]?.alt} className="w-[85%] h-[85%]" />
        </div>
      )
  }
}