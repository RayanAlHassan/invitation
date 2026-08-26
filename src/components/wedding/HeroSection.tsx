import { motion } from "framer-motion";
import { Language, wedding } from "@/data/wedding";

interface Props {
  language: Language;
}

export default function HeroSection({ language }: Props) {
  return (
    <section className="royal-hero">
   <div className="royal-hero-shade" /> 

    <div className="royal-sparkles" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <motion.span
            key={index}
            style={{
              left: `${5 + ((index * 17) % 90)}%`,
              top: `${8 + ((index * 23) % 82)}%`,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2.5 + (index % 5),
              delay: index * 0.12,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="royal-bird bird-a"
        animate={{ x: [0, 20, 0], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        ︿
      </motion.div>

      <motion.div
        className="royal-bird bird-b"
        animate={{ x: [0, -25, 0], y: [0, 7, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      >
        ︿
      </motion.div>

      <div className="royal-frame">
        <span className="royal-corner top-left" />
        <span className="royal-corner top-right" />
        <span className="royal-corner bottom-left" />
        <span className="royal-corner bottom-right" />
      </div>

      <div className="container royal-hero-content">
        <motion.div
          className="royal-monogram-image-wrapper"
          initial={{ opacity: 0, scale: 0.72, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.img
            src="/images/wedding/royal-monogram.png"
            alt="S and R wedding monogram"
            className="royal-monogram-image"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          className="royal-quran"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <small>
            {language === "en"
              ? "TOGETHER BY THE MERCY OF ALLAH"
              : "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيم"}
          </small>

          <p>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
            أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
            مَّوَدَّةً وَرَحْمَةً
          </p>

          <span>
            {language === "en"
              ? "Surah Ar-Rum · 21"
              : "سورة الروم · الآية ٢١"}
          </span>
        </motion.div>

        <div className="royal-divider">
          <span />
          <b>❦</b>
          <span />
        </div>

        <motion.div
          className="royal-names"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
        >
          <h1 className="royal-name">
            {language === "en" ? (
              <>
                <span className="royal-initial">
                  {wedding.groom.en.charAt(0)}
                </span>
                <span className="royal-name-rest">
                  {wedding.groom.en.slice(1)}
                </span>
              </>
            ) : (
              <span className="royal-name-arabic">
                {wedding.groom.ar}
              </span>
            )}
          </h1>

          <div className="royal-and">
            <i />
            <span>&</span>
            <i />
          </div>

          <h1 className="royal-name">
            {language === "en" ? (
              <>
                <span className="royal-initial">
                  {wedding.bride.en.charAt(0)}
                </span>
                <span className="royal-name-rest">
                  {wedding.bride.en.slice(1)}
                </span>
              </>
            ) : (
              <span className="royal-name-arabic">
                {wedding.bride.ar}
              </span>
            )}
          </h1>
        </motion.div>

        <motion.p
          className="royal-marriage-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
        >
          {language === "en"
            ? "ARE GETTING MARRIED"
            : "يسرّهما دعوتكم لحفل زفافهما"}
        </motion.p>

        <motion.div
          className="royal-bottom-heart"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ♡
        </motion.div>
      </div> 
    </section>
  );
}
