import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function MusicToggle({ playing, onToggle }) {
  // Simulating a progress bar for the Spotify aesthetic
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [playing])

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 flex items-center justify-between px-6 py-3 z-50 rounded-2xl"
      style={{
        width: 'clamp(320px, 90vw, 600px)',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 10, 8, 0.85)', // Deep matte charcoal
        border: '1px solid rgba(210,185,140,0.15)', // Subtle gold border
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* 1. Track Info (Left) */}
      <div className="flex items-center gap-4 w-1/3">
        {/* Spinning Vinyl / Album Art */}
        <motion.div
          className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
          style={{
            border: '2px solid rgba(210,185,140,0.3)',
            background: 'linear-gradient(135deg, #2a1b12, #120c08)',
          }}
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* Vinyl center label detail */}
          <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#d2b98c] opacity-80" />
          <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#0a0502]" />
        </motion.div>

        <div className="flex flex-col truncate">
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '14px',
            color: '#d2b98c',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Cinematic Memories
          </span>
          <span style={{
            fontFamily: 'sans-serif',
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(210,185,140,0.5)'
          }}>
            Original Score
          </span>
        </div>
      </div>

      {/* 2. Playback Controls & Progress (Center) */}
      <div className="flex flex-col items-center justify-center w-1/3 gap-2">
        {/* Buttons */}
        <div className="flex items-center gap-6">
          {/* Prev Track (Aesthetic) */}
          <button className="text-[rgba(210,185,140,0.5)] hover:text-[#d2b98c] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause (Functional) */}
          <motion.button
            onClick={onToggle}
            className="flex items-center justify-center rounded-full bg-[#d2b98c] text-[#0a0502]"
            style={{ width: '36px', height: '36px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          {/* Next Track (Aesthetic) */}
          <button className="text-[rgba(210,185,140,0.5)] hover:text-[#d2b98c] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <span style={{ fontSize: '9px', color: 'rgba(210,185,140,0.5)', fontVariantNumeric: 'tabular-nums' }}>
            0:{(Math.floor(progress) % 60).toString().padStart(2, '0')}
          </span>
          <div className="relative flex-1 h-1 bg-[rgba(210,185,140,0.15)] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-[#d2b98c] rounded-full"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
          <span style={{ fontSize: '9px', color: 'rgba(210,185,140,0.5)', fontVariantNumeric: 'tabular-nums' }}>
            3:24
          </span>
        </div>
      </div>

      {/* 3. Extra Controls (Right) */}
      <div className="flex items-center justify-end w-1/3 gap-4">
        {/* Animated EQ Bars when playing */}
        <div className="flex items-end gap-1 h-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#d2b98c] rounded-t-sm"
              animate={playing ? { height: ['20%', '100%', '40%', '80%', '20%'] } : { height: '20%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            />
          ))}
        </div>
        {/* Volume Icon (Aesthetic) */}
        <button className="text-[rgba(210,185,140,0.5)] hover:text-[#d2b98c] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}