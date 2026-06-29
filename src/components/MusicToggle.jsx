import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function MusicToggle({ playing, onToggle }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval

    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [playing])

  return (
    <motion.div
      className="flex items-center justify-between rounded-2xl px-6 py-3"
      style={{
        width: 'min(620px, 92vw)',
        background: 'rgba(15,10,8,0.82)',
        border: '1px solid rgba(210,185,140,0.15)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow:
          '0 18px 50px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8,
        duration: 1,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <motion.div
          className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden"
          style={{
            border: '2px solid rgba(210,185,140,.30)',
            background:
              'radial-gradient(circle at 35% 35%, #3b2417 0%, #120c08 70%)',
          }}
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#d2b98c]" />
            <div className="absolute w-1 h-1 rounded-full bg-black" />
          </div>
        </motion.div>

        <div className="truncate">
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '15px',
              color: '#d2b98c',
            }}
            className="truncate"
          >
            Cinematic Memories
          </div>

          <div
            style={{
              fontSize: '10px',
              letterSpacing: '.12em',
              color: 'rgba(210,185,140,.55)',
              textTransform: 'uppercase',
            }}
          >
            Original Score
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center flex-[1.2] px-5">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-[rgba(210,185,140,.45)] hover:text-[#d2b98c] transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-full bg-[#d2b98c]"
            style={{
              width: 42,
              height: 42,
              color: '#120c08',
            }}
          >
            {playing ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6zm8-14v14h4V5z" />
              </svg>
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginLeft: 2 }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          <button className="text-[rgba(210,185,140,.45)] hover:text-[#d2b98c] transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full">
          <span
            style={{
              fontSize: 10,
              color: 'rgba(210,185,140,.55)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            0:{String(Math.floor(progress) % 60).padStart(2, '0')}
          </span>

          <div className="relative flex-1 h-[4px] rounded-full bg-[rgba(210,185,140,.15)] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-[#d2b98c]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span
            style={{
              fontSize: 10,
              color: 'rgba(210,185,140,.55)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            3:24
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-4 flex-1">
        <div className="flex items-end gap-1 h-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-[#d2b98c]"
              animate={
                playing
                  ? {
                      height: ['25%', '100%', '40%', '80%', '25%'],
                    }
                  : {
                      height: '25%',
                    }
              }
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        <button className="text-[rgba(210,185,140,.45)] hover:text-[#d2b98c] transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}