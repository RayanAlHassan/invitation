import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import EnvelopeIntro from "@/components/wedding/EnvelopeIntro";
import CelebrationBurst from "@/components/wedding/CelebrationBurst";

import HeroSection from "@/components/wedding/HeroSection";
import InvitationSection from "@/components/wedding/InvitationSection";
import ScratchDateSection from "@/components/wedding/ScratchDateSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import ScheduleSection from "@/components/wedding/ScheduleSection";
import GuestNoteSection from "@/components/wedding/GuestNoteSection";
import VenueSection from "@/components/wedding/VenueSection";
import CelebrationPlanSection from "@/components/wedding/CelebrationPlanSection";
import ClosingSection from "@/components/wedding/ClosingSection";

import {
  Language,
  translations,
} from "@/data/wedding";

export default function Home() {
  const [language, setLanguage] =
    useState<Language>("ar");

  const [opened, setOpened] =
    useState(false);

  const [celebrating, setCelebrating] =
    useState(false);

  const [musicPlaying, setMusicPlaying] =
    useState(false);

  const [dateRevealed, setDateRevealed] =
    useState(false);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang =
      language;

    document.documentElement.dir =
      language === "ar"
        ? "rtl"
        : "ltr";
  }, [language]);

  const startCelebration = () => {
    setCelebrating(true);

    window.setTimeout(() => {
      setCelebrating(false);
    }, 3900);
  };

  const toggleMusic = async () => {
    const audio =
      document.getElementById(
        "wedding-music"
      ) as HTMLAudioElement | null;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Salah & Rayan | Wedding Invitation
        </title>

        <meta
          name="description"
          content="Wedding invitation of Salah and Rayan"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      <audio
        id="wedding-music"
        loop
      >
        <source
          src="/music/wedding-melody.mp3"
          type="audio/mpeg"
        />
      </audio>

      <motion.main
        className={`wedding-site ${
          language === "ar"
            ? "arabic-mode"
            : ""
        }`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: opened ? 1 : 0,
        }}
        transition={{
          duration: 1.1,
        }}
      >
        <div className="floating-controls">
          <button
            className="control-button language-button"
            onClick={() =>
              setLanguage(
                language === "en"
                  ? "ar"
                  : "en"
              )
            }
          >
            <i className="bi bi-translate" />

            <span>
              {language === "en"
                ? "عربي"
                : "EN"}
            </span>
          </button>

          <button
            className={`control-button music-button ${
              musicPlaying
                ? "playing"
                : ""
            }`}
            onClick={toggleMusic}
            aria-label={t.music}
          >
            <i
              className={`bi ${
                musicPlaying
                  ? "bi-volume-up-fill"
                  : "bi-volume-mute-fill"
              }`}
            />
          </button>
        </div>

        {/* 1. Hero - NO DATE */}
        <HeroSection
          language={language}
        />

        {/* 2. Invitation - NO DATE */}
        <InvitationSection
          language={language}
        />

        {/* 3. Guest discovers date here */}
        <ScratchDateSection
          language={language}
          onComplete={() =>
            setDateRevealed(true)
          }
        />

        {/* 4. COUNTDOWN ALWAYS VISIBLE */}
        <CountdownSection
          language={language}
        />

        {/* Everything below can use date */}
        <CelebrationPlanSection
          language={language}
        />

        <GuestNoteSection
          language={language}
        />

        <VenueSection
          language={language}
        />

        <ClosingSection
          language={language}
        />
      </motion.main>

      <AnimatePresence>
        {!opened && (
          <EnvelopeIntro
            language={language}
            onCelebrate={() => {
              const audio =
                document.getElementById(
                  "wedding-music"
                ) as HTMLAudioElement | null;

              if (audio) {
                audio.volume = 0.35;

                audio
                  .play()
                  .then(() => {
                    setMusicPlaying(true);
                  })
                  .catch((error) => {
                    console.error(
                      "Wedding music could not start:",
                      error
                    );
                  });
              }

              startCelebration();
            }}
            onOpen={() =>
              setOpened(true)
            }
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {celebrating &&
          opened && (
            <motion.div
              className="hero-celebration-overlay"
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <CelebrationBurst />
            </motion.div>
          )}
      </AnimatePresence>

      {/* Keeps state for later effects if needed */}
      <span
        hidden
        data-date-revealed={
          dateRevealed
        }
      />
    </>
  );
}
