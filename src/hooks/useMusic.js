import { useState, useRef, useEffect, useCallback } from 'react'

export const useMusic = (src) => {
  const [playing, setPlaying] = useState(false)

  const audioRef = useRef(null)
  const fadeInterval = useRef(null)

  useEffect(() => {
    const audio = new Audio(src)

    audio.loop = true
    audio.volume = 0

    audioRef.current = audio

    return () => {
      clearInterval(fadeInterval.current)
      audio.pause()
    }
  }, [src])

  const clearFade = () => {
    if (fadeInterval.current) {
      clearInterval(fadeInterval.current)
      fadeInterval.current = null
    }
  }

  const fadeIn = () => {
    clearFade()

    fadeInterval.current = setInterval(() => {
      const audio = audioRef.current

      if (!audio) return

      if (audio.volume >= 1) {
        audio.volume = 1
        clearFade()
        return
      }

      audio.volume = Math.min(audio.volume + 0.05, 1)
    }, 50)
  }

  const fadeOut = (callback) => {
    clearFade()

    fadeInterval.current = setInterval(() => {
      const audio = audioRef.current

      if (!audio) return

      if (audio.volume <= 0.05) {
        audio.volume = 0
        clearFade()

        callback?.()

        return
      }

      audio.volume = Math.max(audio.volume - 0.05, 0)
    }, 50)
  }

  const play = useCallback(() => {
    const audio = audioRef.current

    if (!audio || playing) return

    audio.play().catch((err) => {
      console.error('Unable to play audio:', err)
    })

    fadeIn()
    setPlaying(true)
  }, [playing])

  const stop = useCallback(() => {
    const audio = audioRef.current

    if (!audio) return

    fadeOut(() => {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    })
  }, [])

  const toggle = useCallback(() => {
    if (playing) {
      stop()
    } else {
      play()
    }
  }, [playing, play, stop])

  return {
    playing,
    play,
    stop,
    toggle,
  }
}