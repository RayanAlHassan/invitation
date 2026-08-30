import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Language } from "@/data/wedding";

type FamilySide = "bride" | "groom";

export default function GuestNoteSection({
  language,
}: {
  language: Language;
}) {
  const isArabic = language === "ar";
  const [activeSide, setActiveSide] =
    useState<FamilySide>("bride");

  const contacts = useMemo(
    () => ({
      bride: {
        labelAr: "أهل العروس",
        labelEn: "Bride's Family",
        displayNumber: "76 303 610",
        phoneNumber: "+96176303610",
      },
      groom: {
        labelAr: "أهل العريس",
        labelEn: "Groom's Family",
        displayNumber: "70 066 678",
        phoneNumber: "+96170066678",
      },
    }),
    []
  );

  const activeContact =
    contacts[activeSide];

  const whatsappMessage = isArabic
    ? "مرحباً، نود إبلاغكم بخصوص حضور حفل زفاف صلاح وريان."
    : "Hello, we would like to let you know regarding our attendance at Salah & Rayan's wedding.";

  const whatsappUrl =
    `https://wa.me/${activeContact.phoneNumber.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (
    <section
      className={`guest-note-section royal-paper ${
        isArabic ? "guest-note-arabic" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container">
        <motion.div
          className="guest-note-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="guest-note-top-ornament">
            ❦
          </div>

          <span className="royal-eyebrow">
            {isArabic
              ? "ملاحظة لضيوفنا الأعزاء"
              : "A NOTE TO OUR DEAR GUESTS"}
          </span>

          <div className="guest-note-divider">
            <span />
            <i>✦</i>
            <span />
          </div>

          <p className="guest-note-main">
            {isArabic
              ? "حرصًا منّا على حسن تنظيم حفل زفافنا، نودّ إعلامكم بأن الحجز يتم وفق عدد الأشخاص المدعوين."
              : "To help us prepare for our wedding celebration, seating is reserved according to the number of invited guests."}
          </p>

          <p className="guest-note-secondary">
            {isArabic
              ? "في حال تعذّر حضوركم، نرجو منكم التكرّم بإبلاغنا مسبقًا عبر الاتصال أو الواتساب، مما يساعدنا على تأكيد العدد النهائي للضيوف."
              : "If you are unable to attend, we kindly ask that you let us know in advance by phone or WhatsApp. This will help us confirm the final guest count."}
          </p>

          <div className="guest-note-small-ornament">
            ❦
          </div>

          <p className="guest-note-closing">
            {isArabic
              ? "يرجى التواصل مع أهل العروس أو أهل العريس بحسب جهة الدعوة."
              : "Please contact the bride's or groom's family according to the side from which you received your invitation."}
          </p>

          <div className="family-switcher">
            <button
              type="button"
              className={`family-switch-button ${
                activeSide === "bride"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSide("bride")
              }
            >
              {isArabic
                ? "أهل العروس"
                : "Bride's Family"}
            </button>

            <button
              type="button"
              className={`family-switch-button ${
                activeSide === "groom"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSide("groom")
              }
            >
              {isArabic
                ? "أهل العريس"
                : "Groom's Family"}
            </button>
          </div>

          <motion.div
            key={activeSide}
            className="single-family-contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="guest-family-label">
              {isArabic
                ? activeContact.labelAr
                : activeContact.labelEn}
            </span>

            <a
              href={`tel:${activeContact.phoneNumber}`}
              className="guest-phone-number"
            >
              <i className="bi bi-telephone-fill" />
              <span>
                {activeContact.displayNumber}
              </span>
            </a>

            <div className="guest-contact-buttons">
              <a
                href={`tel:${activeContact.phoneNumber}`}
                className="guest-contact-button"
              >
                <i className="bi bi-telephone" />
                <span>
                  {isArabic
                    ? "اتصال"
                    : "CALL"}
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="guest-contact-button"
              >
                <i className="bi bi-whatsapp" />
                <span>
                  {isArabic
                    ? "واتساب"
                    : "WHATSAPP"}
                </span>
              </a>
            </div>
          </motion.div>

          <div className="guest-note-bottom">
            ♡
          </div>
        </motion.div>
      </div>
    </section>
  );
}
