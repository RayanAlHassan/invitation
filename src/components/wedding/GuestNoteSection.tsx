import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

export default function GuestNoteSection({
  language,
}: {
  language: Language;
}) {
  const isArabic = language === "ar";

  /*
   * IMPORTANT:
   * Replace this with the real phone number.
   *
   * Example:
   * const phoneNumber = "+96170123456";
   *
   * Do not add spaces for WhatsApp.
   */
  const phoneNumber = "+961XXXXXXXX";

  const whatsappNumber =
    phoneNumber.replace(/\D/g, "");

  const whatsappMessage = isArabic
    ? "مرحباً، نود إبلاغكم بخصوص حضور حفل زفاف صلاح وريان."
    : "Hello, we would like to let you know regarding our attendance at Salah & Rayan's wedding.";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
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
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
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
              ? "في حال تعذّر حضوركم، نرجو منكم التكرّم بإبلاغنا مسبقًا عبر الاتصال أو الواتساب على الرقم أدناه، مما يساعدنا على تأكيد العدد النهائي للضيوف."
              : "If you are unable to attend, we kindly ask that you let us know in advance by calling or messaging the number below. This will help us confirm the final guest count."}
          </p>

          <div className="guest-note-small-ornament">
            ❦
          </div>

          <p className="guest-note-closing">
            {isArabic
              ? "نقدّر تعاونكم وتفهّمكم، ونسعد بمشاركتكم فرحتنا."
              : "We truly appreciate your kindness and understanding, and look forward to celebrating with you."}
          </p>

          <div className="guest-contact">
            <a
              href={`tel:${phoneNumber}`}
              className="guest-phone-number"
              aria-label={
                isArabic
                  ? "الاتصال بنا"
                  : "Call us"
              }
            >
              <i className="bi bi-telephone-fill" />

              <span>{phoneNumber}</span>
            </a>

            <div className="guest-contact-buttons">
              <a
                href={`tel:${phoneNumber}`}
                className="guest-contact-button"
              >
                <i className="bi bi-telephone" />

                <span>
                  {isArabic
                    ? "اتصل بنا"
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
          </div>

          <div className="guest-note-bottom">
            <span>♡</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
