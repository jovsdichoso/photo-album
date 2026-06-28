import { useState, useRef } from 'react';

export const useMusic = (src) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(src));

  const toggle = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      // The play() promise handles the browser's autoplay rejection
      audioRef.current.play().catch(e => console.error("Autoplay blocked:", e));
    }
    setPlaying(!playing);
  };

  return { playing, toggle };
};