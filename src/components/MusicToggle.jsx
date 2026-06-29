import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const QUOTES = [
  "Every photograph tells a story waiting to be remembered.",
  "Time stands still within the borders of a frame.",
  "Moments captured today become the treasures of tomorrow.",
  "The quiet echoes of the past, preserved in light and shadow."
]

const TOTAL_SECONDS = 260

export default function MusicToggle({ playing, onToggle }) {
  const [progress, setProgress] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(playing)
  }, [playing])

  useEffect(() => {
    let interval
    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.3))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [playing])

  useEffect(() => {
    if (!expanded) return
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 8000)
    return () => clearInterval(quoteInterval)
  }, [expanded])

  const currentSeconds = Math.floor((progress / 100) * TOTAL_SECONDS)

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = String(secs % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        width: expanded ? 'min(340px, 92vw)' : 'min(190px, 92vw)',
        borderRadius: expanded ? 20 : 30,
      }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        background: 'linear-gradient(145deg, rgba(61,47,33,0.75) 0%, rgba(33,22,13,0.9) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(210,185,140,0.15)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        transformOrigin: 'bottom center',
        overflow: 'hidden'
      }}
      className="mx-auto flex flex-col"
    >
      <motion.div
        layout
        className="flex items-center justify-between cursor-pointer"
        style={{ padding: expanded ? '16px 20px 8px' : '6px 10px' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <motion.div
            layout
            className="relative flex-shrink-0"
            style={{ width: expanded ? 44 : 32, height: expanded ? 44 : 32 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
              style={{
                background: 'conic-gradient(from 0deg, #111, #3a3a3a, #111, #3a3a3a, #111)',
                border: '1px solid rgba(210,185,140,0.25)'
              }}
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-[3px] rounded-full border border-white/5" />
              <div className="w-[35%] h-[35%] rounded-full bg-gradient-to-br from-[#d2b98c] to-[#a38c62] flex items-center justify-center shadow-inner">
                <div className="w-1 h-1 rounded-full bg-[#111]" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div layout className="flex flex-col truncate">
            <motion.span
              layout
              className="truncate text-[#d2b98c]"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: expanded ? '18px' : '14px',
                letterSpacing: '0.02em',
                lineHeight: 1.1
              }}
            >
              Photograph
            </motion.span>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="truncate text-[#d2b98c]/50 uppercase mt-1"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.2em'
                  }}
                >
                  Ed Sheeran
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {!expanded && (
          <motion.button
            layoutId="play-pause-btn"
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
            className="flex-shrink-0 flex items-center justify-center rounded-full bg-transparent border border-[#d2b98c]/30 text-[#d2b98c] hover:bg-[#d2b98c]/10 transition-colors"
            style={{ width: 32, height: 32, marginLeft: 8 }}
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6zm8-14v14h4V5z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="px-5 pb-5"
          >
            <div className="mt-3 flex items-center gap-3 w-full">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', color: 'rgba(210,185,140,0.6)', fontVariantNumeric: 'tabular-nums' }}>
                {formatTime(currentSeconds)}
              </span>
              
              <div className="relative flex-1 h-[1.5px] rounded-full bg-[#d2b98c]/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#d2b98c]/40 to-[#d2b98c]"
                  style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(210,185,140,0.3)' }}
                />
              </div>

              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', color: 'rgba(210,185,140,0.6)', fontVariantNumeric: 'tabular-nums' }}>
                {formatTime(TOTAL_SECONDS)}
              </span>
            </div>

            <div className="mt-5 mb-5 h-10 flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 3, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -3, filter: 'blur(2px)' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="text-[#d2b98c]/70 italic font-serif leading-snug"
                  style={{ fontSize: '13px', letterSpacing: '0.03em' }}
                >
                  "{QUOTES[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <motion.button
                layoutId="play-pause-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-full bg-gradient-to-b from-[#dfcaaa] to-[#c5aa7a] text-[#120a07] shadow-md transition-shadow hover:shadow-[0_0_15px_rgba(210,185,140,0.25)]"
                style={{ width: 48, height: 48, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
              >
                {playing ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6zm8-14v14h4V5z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}