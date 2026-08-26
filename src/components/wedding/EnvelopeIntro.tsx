import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

interface Props {
  language: Language;
  onOpen: () => void;
  onCelebrate?: () => void;
}

export default function EnvelopeIntro({
  language,
  onOpen,
  onCelebrate,
}: Props) {

  const handleOpen = () => {
    onCelebrate?.();
    onOpen();
  };

  return (
    <motion.section
      className="luxury-envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(8px)",
      }}
      transition={{ duration: 0.8 }}
    >
      <div className="envelope-light" />

      <div className="envelope-stars" aria-hidden="true">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
      </div>

      <motion.div
        className="luxury-envelope-wrap"
        initial={{ opacity: 0, y: 35, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="envelope-heading">
          <span className="envelope-small-title">
            {language === "en"
              ? "A WEDDING INVITATION"
              : "دعوة زفاف"}
          </span>

          <div className="envelope-title-line">
            <i />
            <span>❦</span>
            <i />
          </div>
        </div>

        <motion.button
          type="button"
          className="luxury-envelope-button"
          onClick={handleOpen}
          whileHover={{
            y: -8,
            rotate: -0.4,
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          aria-label={
            language === "en"
              ? "Open wedding invitation"
              : "فتح دعوة الزفاف"
          }
        >
          {/* card peeking from envelope */}
          <div className="envelope-card-preview">
            <span>S</span>
            <i />
            <span>R</span>
          </div>

          {/* back of envelope */}
          <div className="envelope-back" />

          {/* left and right folds */}
          <div className="envelope-fold envelope-fold-left" />
          <div className="envelope-fold envelope-fold-right" />

          {/* bottom fold */}
          <div className="envelope-fold-bottom" />

          {/* top flap */}
          <div className="envelope-flap">
            <div className="flap-decoration">❦</div>
          </div>

          {/* floral seal */}
          <motion.div
            className="envelope-royal-seal"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/images/wedding/royal-monogram.png"
              alt="S and R"
            />
          </motion.div>

          <div className="envelope-open-label">
            <span>
              {language === "en"
                ? "OPEN INVITATION"
                : "افتح الدعوة"}
            </span>

            <small>♡</small>
          </div>
        </motion.button>

        <p className="envelope-bottom-copy">
          {language === "en"
            ? "Salah & Rayan"
            : "صلاح و ريان"}
        </p>
      </motion.div>
    </motion.section>
  );
}
