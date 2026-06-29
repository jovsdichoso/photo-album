import { motion } from 'framer-motion'
import Album from './components/Album'
import MusicToggle from './components/MusicToggle'
import { albumData } from './data/album'
import { useMusic } from './hooks/useMusic'

export default function App() {
  const { playing, toggle } = useMusic(albumData.music.src)

  return (
    <div
      className="fixed inset-0 overflow-hidden wood-bg"
      style={{ userSelect: 'none' }}
    >
      {/* Ambient table light */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(90,55,15,0.25) 0%, transparent 65%)',
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.65)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none z-40 mix-blend-overlay"
        style={{
          opacity: 0.15,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Album */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{
          paddingBottom: '140px',
          paddingTop: '24px',
        }}
      >
        <motion.div
          className="flex items-center justify-center w-full h-full"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2.5,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <Album pages={albumData.pages} />
        </motion.div>
      </div>

      {/* Floating music player */}
      <div
        className="fixed left-1/2 bottom-8 z-50"
        style={{
          transform: 'translateX(-50%)',
        }}
      >
        <MusicToggle
          playing={playing}
          onToggle={toggle}
        />
      </div>
    </div>
  )
}