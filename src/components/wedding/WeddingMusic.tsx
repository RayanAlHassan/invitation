import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface WeddingMusicHandle {
  play: () => void;
}

const WeddingMusic = forwardRef<WeddingMusicHandle>(
  function WeddingMusic(_, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Music is enabled by default
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [playing, setPlaying] = useState(false);

    const playMusic = () => {
      const audio = audioRef.current;

      if (!audio || !musicEnabled) return;

      audio.volume = 0.35;

      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error(
            "Wedding music could not start:",
            error
          );
        });
    };

    const pauseMusic = () => {
      const audio = audioRef.current;

      if (!audio) return;

      audio.pause();

      setPlaying(false);
      setMusicEnabled(false);
    };

    const resumeMusic = () => {
      const audio = audioRef.current;

      if (!audio) return;

      setMusicEnabled(true);

      audio.volume = 0.35;

      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error(
            "Wedding music could not resume:",
            error
          );
        });
    };

    const toggleMusic = () => {
      if (playing) {
        pauseMusic();
      } else {
        resumeMusic();
      }
    };

    useImperativeHandle(ref, () => ({
      play: playMusic,
    }));

    return (
      <>
        <audio
          ref={audioRef}
          src="/music/wedding-melody.mp3"
          preload="auto"
          loop
          playsInline
        />

        <button
          type="button"
          className={`wedding-music-button ${
            playing ? "music-playing" : ""
          }`}
          onClick={toggleMusic}
          aria-label={
            playing
              ? "إيقاف الموسيقى"
              : "تشغيل الموسيقى"
          }
          title={
            playing
              ? "إيقاف الموسيقى"
              : "تشغيل الموسيقى"
          }
        >
          <span className="music-icon">
            {playing ? "♫" : "♪"}
          </span>

          {playing && (
            <span className="music-waves">
              <i />
              <i />
              <i />
            </span>
          )}
        </button>
      </>
    );
  }
);

export default WeddingMusic;
