import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

export default function InvitationSection({
  language,
}: {
  language: Language;
}) {
  const isArabic = language === "ar";

  return (
    <section
      className={`invitation-paper-section ${
        isArabic ? "arabic-invitation" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container">
        <motion.div
          className="family-invitation"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1 }}
        >
          {/* Bismillah */}
          <motion.div
            className="invitation-bismillah"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            {isArabic
              ? "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ"
              : "In the Name of Allah, the Most Gracious, the Most Merciful"}
          </motion.div>

          <div className="invitation-ornament">
            <span />
            <b>❦</b>
            <span />
          </div>

          <p className="invitation-intro">
            {isArabic
              ? "بكل المحبة والسرور"
              : "Together with their families"}
          </p>

          {isArabic && (
            <p className="invitation-honor">
              يتشرّف
            </p>
          )}

          {/* Families */}
          <div className="invitation-families">
            <div className="family-name">
              {isArabic
                ? "السيد محمد حبلص وعائلته"
                : "Mr. Mohamad Hoblos & Family"}
            </div>

            <div className="family-and">
              {isArabic ? "و" : "and"}
            </div>

            <div className="family-name">
              {isArabic
                ? "السيد أحمد الحسن وعائلته"
                : "Mr. Ahmad AlHassan & Family"}
            </div>
          </div>

          <p className="invitation-request">
            {isArabic
              ? "بدعوتكم لمشاركتهم فرحتهم والاحتفال بزفاف ولديهما"
              : "request the honor of your presence as they joyfully celebrate the marriage of their beloved children"}
          </p>

          {/* Full names */}
          <motion.div
            className="invitation-couple"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2>
              {isArabic
                ? "صلاح أحمد حبلص"
                : "Salah Ahmad Hoblos"}
            </h2>

            <div className="couple-divider">
              <span />
              <b>{isArabic ? "و" : "&"}</b>
              <span />
            </div>

            <h2>
              {isArabic
                ? "ريان أحمد الحسن"
                : "Rayan Ahmad Lhassan"}
            </h2>
          </motion.div>

          {/* Islamic wedding dua */}
          <div className="wedding-dua">
            <div className="dua-symbol">❦</div>

            <p>
              {isArabic
                ? "بارك الله لكما، وبارك عليكما، وجمع بينكما في خير"
                : "May Allah bless you both, shower His blessings upon you, and bring you together in goodness."}
            </p>
          </div>

          <p className="invitation-presence">
            {isArabic
              ? "حضوركم يشرّفنا ويزيد فرحتنا بهجةً وسروراً"
              : "Your presence would be an honor and a cherished part of our celebration."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
