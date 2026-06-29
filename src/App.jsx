import { motion } from 'framer-motion'
import Album from './components/Album'
import MusicToggle from './components/MusicToggle'
import { albumData } from './data/album'
import { useMusic } from './hooks/useMusic'

export default function App() {
  const {
    playing,
    toggle,
    play,
    stop,
  } = useMusic(albumData.music.src)

  return (
    <div
      // touch-none prevents pull-to-refresh and scroll bouncing on mobile
      className="fixed inset-0 overflow-hidden wood-bg bg-[#120c08] select-none touch-none flex flex-col"
      style={{
        height: '100dvh', // Strictly lock to dynamic viewport height
      }}
    >
      {/* --- BACKGROUND EFFECTS --- */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(90,55,15,0.2) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.65)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
        style={{
          opacity: 0.15,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* --- ALBUM AREA (Takes up remaining vertical space) --- */}
      <div className="relative z-30 flex-1 w-full flex items-center justify-center pt-6 sm:pt-12 px-4">
        <motion.div
          className="flex items-center justify-center w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
        >
          <Album
            pages={albumData.pages}
            onAlbumOpen={play}
            onAlbumClose={stop}
          />
        </motion.div>
      </div>

      {/* --- MUSIC PLAYER AREA (Fixed container at the bottom) --- */}
      <div 
        className="relative z-40 w-full flex justify-center flex-shrink-0"
        style={{
          // Use safe-area-inset to respect the iOS home indicator bar
          paddingBottom: 'max(env(safe-area-inset-bottom, 24px), 24px)',
          paddingTop: '16px'
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