import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import AlbumPage from './AlbumPage'

// The "heavy, cinematic" turn — slow to commit, slow to settle.
const FLIP_TRANSITION = { duration: 1.4, ease: [0.25, 1, 0.5, 1] }

/**
 * One physical sheet of paper (or cover).
 */
function Leaf({
  index,
  isCover,
  frontPage,
  backPage,
  frontPageNumber,
  backPageNumber,
  target,
  zIndex,
  left,
  width,
  height,
  isTopRight,
  isTopLeft,
  onFlipped,
  onClickFront,
  onClickBack,
}) {
  const rotateY = useMotionValue(target)
  const prevTarget = useRef(target)

  useEffect(() => {
    if (prevTarget.current === target) return
    prevTarget.current = target
    const controls = animate(rotateY, target, {
      ...FLIP_TRANSITION,
      onComplete: () => onFlipped?.(index),
    })
    return () => controls.stop()
  }, [target, index, onFlipped, rotateY])

  const sweepShadow = useTransform(rotateY, [-180, -90, 0], [0, 0.55, 0])

  return (
    <motion.div
      className="leaf"
      style={{
        position: 'absolute',
        top: 0,
        left,
        width,
        height,
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        rotateY,
        zIndex,
        willChange: 'transform',
      }}
    >
      {/* FRONT — recto / right-hand page */}
      <div
        className="leaf-face leaf-front"
        onClick={isTopRight ? onClickFront : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          cursor: isTopRight ? 'pointer' : 'default',
        }}
      >
        {isCover && frontPage === 'COVER' ? (
          // --- THE FRONT COVER DESIGN ---
          <div 
            className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden" 
            style={{ 
              background: 'linear-gradient(145deg, #3d2f21 0%, #21160d 100%)', 
              borderRadius: '0 4px 4px 0', 
              boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.5), inset 2px 0 5px rgba(255,255,255,0.1)' 
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-8 z-20" style={{ background: 'linear-gradient(90deg, #120c07 0%, #21160d 100%)', borderRight: '1px solid rgba(0,0,0,0.4)' }} />
            <div className="relative z-10 flex flex-col items-center justify-center w-3/4 h-3/4 border border-[rgba(210,185,140,0.2)] p-6 text-center" style={{ left: '10px' }}>
              <div className="absolute inset-1 border border-[rgba(210,185,140,0.1)]" />
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#d2b98c', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '0.25em', margin: 0, textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Our<br/>Story
              </h1>
              <div style={{ width: '40px', height: '1px', background: '#d2b98c', margin: '2rem 0', opacity: 0.5 }} />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(210,185,140,0.7)', textTransform: 'uppercase' }}>
                Tap to open
              </span>
            </div>
          </div>
        ) : (
          <AlbumPage pageData={frontPage} side="right" pageNumber={frontPageNumber} />
        )}
        
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(to left, rgba(0,0,0,0.6), transparent 45%)',
            opacity: sweepShadow,
            borderRadius: isCover ? '0 4px 4px 0' : '0',
          }}
        />
      </div>

      {/* BACK — verso / left-hand page. Pre-rotated 180 */}
      <div
        className="leaf-face leaf-back"
        onClick={isTopLeft ? onClickBack : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          cursor: isTopLeft ? 'pointer' : 'default',
        }}
      >
        {isCover && backPage === 'BACK_COVER' ? (
           // --- THE BACK COVER DESIGN ---
           <div 
             className="w-full h-full relative" 
             style={{ 
               background: 'linear-gradient(145deg, #21160d 0%, #3d2f21 100%)', 
               borderRadius: '4px 0 0 4px', 
               boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.5)' 
             }}
           />
        ) : (
          <AlbumPage pageData={backPage} side="left" pageNumber={backPageNumber} />
        )}
        
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent 45%)',
            opacity: sweepShadow,
            borderRadius: isCover ? '4px 0 0 4px' : '0',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Album({ pages }) {
  const [dimensions, setDimensions] = useState({ width: 400, height: 560 })
  const [currentLeaf, setCurrentLeaf] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  
  // CHANGED: Using Refs for animation locks to completely prevent React race conditions
  const isAnimatingRef = useRef(false)
  const activeIndexRef = useRef(null)

  const isMobile = window.innerWidth < 640

  const calcDimensions = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    if (window.innerWidth < 640) {
      const w = Math.min(vw * 0.88, 360)
      const h = Math.min(vh * 0.72, 500)
      setDimensions({ width: w, height: h })
    } else {
      const maxW = Math.min(vw * 0.42, 460)
      const h = Math.min(vh * 0.78, 640)
      setDimensions({ width: maxW, height: h })
    }
  }, [])

  useEffect(() => {
    calcDimensions()
    window.addEventListener('resize', calcDimensions)
    return () => window.removeEventListener('resize', calcDimensions)
  }, [calcDimensions])

  const leaves = useMemo(() => {
    const sheets = []
    
    sheets.push({
      isCover: true,
      front: 'COVER',
      back: null,
      frontPageNumber: null,
      backPageNumber: null,
    })

    for (let i = 0; i < pages.length; i += 2) {
      sheets.push({
        isCover: false,
        front: pages[i] || null,
        back: pages[i + 1] || null,
        frontPageNumber: i + 1,
        backPageNumber: i + 2,
      })
    }

    sheets.push({
      isCover: true,
      front: null,
      back: 'BACK_COVER',
      frontPageNumber: null,
      backPageNumber: null,
    })

    return sheets
  }, [pages])

  const numLeaves = leaves.length

  const goNext = useCallback(() => {
    if (isAnimatingRef.current || currentLeaf >= numLeaves) return
    
    isAnimatingRef.current = true
    activeIndexRef.current = currentLeaf
    setCurrentLeaf((c) => c + 1)
    
    // Failsafe: Force unlock after transition finishes, just in case
    setTimeout(() => {
      isAnimatingRef.current = false
      activeIndexRef.current = null
    }, 1500)
  }, [currentLeaf, numLeaves])

  const goPrev = useCallback(() => {
    if (isAnimatingRef.current || currentLeaf <= 0) return
    
    isAnimatingRef.current = true
    activeIndexRef.current = currentLeaf - 1
    setCurrentLeaf((c) => c - 1)
    
    // Failsafe: Force unlock after transition finishes
    setTimeout(() => {
      isAnimatingRef.current = false
      activeIndexRef.current = null
    }, 1500)
  }, [currentLeaf])

  const handleLeafFlipped = useCallback((index) => {
    if (activeIndexRef.current === index) {
      activeIndexRef.current = null
      isAnimatingRef.current = false
    }
  }, [])

  // ROCK-SOLID AUTOPLAY TIMER
  useEffect(() => {
    if (!isAutoPlaying) return
    
    if (currentLeaf >= numLeaves) {
      setIsAutoPlaying(false)
      return
    }
    
    const timer = setTimeout(() => {
      goNext()
    }, 4500)
    
    return () => clearTimeout(timer)
  }, [isAutoPlaying, currentLeaf, numLeaves, goNext])

  const handleManualPrev = () => {
    setIsAutoPlaying(false)
    goPrev()
  }
  
  const handleManualNext = () => {
    setIsAutoPlaying(false)
    goNext()
  }

  // SNAPPY TOGGLE
  const toggleAutoplay = () => {
    if (!isAutoPlaying) {
      setIsAutoPlaying(true)
      // Immediately fire the turn so the user doesn't have to wait 4.5 seconds
      if (currentLeaf < numLeaves) goNext()
    } else {
      setIsAutoPlaying(false)
    }
  }

  const halfWidth = dimensions.width
  const pageHeight = dimensions.height
  const spreadWidth = isMobile ? halfWidth : halfWidth * 2
  const spineX = isMobile ? 0 : halfWidth

  let cameraShiftX = 0;
  let shadowLeft = 0;
  let shadowWidth = spreadWidth;

  if (!isMobile) {
    if (currentLeaf === 0) {
      cameraShiftX = -(halfWidth / 2);
      shadowLeft = halfWidth; 
      shadowWidth = halfWidth;
    } else if (currentLeaf === numLeaves) {
      cameraShiftX = halfWidth / 2;
      shadowLeft = 0; 
      shadowWidth = halfWidth;
    }
  } else {
    shadowLeft = 0;
    shadowWidth = halfWidth;
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.div 
        className="relative flex flex-col items-center justify-center"
        animate={{ x: cameraShiftX }}
        transition={FLIP_TRANSITION}
      >
        <div
          className="relative z-10"
          style={{
            width: spreadWidth,
            height: pageHeight,
            perspective: '2500px',
            WebkitPerspective: '2500px',
          }}
        >
          <motion.div
            className="absolute top-0 z-0"
            initial={false}
            animate={{
              left: shadowLeft,
              width: shadowWidth,
            }}
            transition={FLIP_TRANSITION}
            style={{
              height: pageHeight,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.85), 0 10px 25px rgba(0,0,0,0.6), 0 0 15px rgba(0,0,0,0.4)',
              borderRadius: '4px',
              background: '#0a0502', 
            }}
          />

          {leaves.map((sheet, i) => {
            const target = i < currentLeaf ? -180 : 0
            const isActive = activeIndexRef.current === i
            const zIndex = isActive
              ? 999
              : i < currentLeaf
                ? 100 + i
                : 500 + (numLeaves - i)

            return (
              <Leaf
                key={i}
                index={i}
                isCover={sheet.isCover}
                frontPage={sheet.front}
                backPage={sheet.back}
                frontPageNumber={sheet.frontPageNumber}
                backPageNumber={sheet.backPageNumber}
                target={target}
                zIndex={zIndex}
                left={spineX}
                width={halfWidth}
                height={pageHeight}
                isTopRight={i === currentLeaf}
                isTopLeft={i === currentLeaf - 1}
                onFlipped={handleLeafFlipped}
                onClickFront={handleManualNext}
                onClickBack={handleManualPrev}
              />
            )
          })}
        </div>
      </motion.div>

      <div className="flex items-center gap-8 mt-12 z-20">
        <button
          onClick={handleManualPrev}
          disabled={currentLeaf === 0}
          style={{
            background: 'none',
            border: 'none',
            cursor: currentLeaf === 0 ? 'default' : 'pointer',
            color: currentLeaf === 0 ? 'rgba(180,150,80,0.2)' : 'rgba(180,150,80,0.6)',
            padding: '8px',
            transition: 'color 0.3s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="13,4 7,10 13,16" />
          </svg>
        </button>

        <button
          onClick={toggleAutoplay}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: isAutoPlaying ? 'rgba(180,150,80,0.8)' : 'rgba(180,150,80,0.4)',
              transition: 'color 0.3s ease',
            }}
          >
            {currentLeaf} — {numLeaves}
          </span>
          <span
            style={{
              fontSize: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: isAutoPlaying ? 'rgba(180,150,80,0.6)' : 'transparent',
              transition: 'color 0.3s ease',
            }}
          >
            Playing
          </span>
        </button>

        <button
          onClick={handleManualNext}
          disabled={currentLeaf >= numLeaves}
          style={{
            background: 'none',
            border: 'none',
            cursor: currentLeaf >= numLeaves ? 'default' : 'pointer',
            color: currentLeaf >= numLeaves ? 'rgba(180,150,80,0.2)' : 'rgba(180,150,80,0.6)',
            padding: '8px',
            transition: 'color 0.3s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="7,4 13,10 7,16" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}