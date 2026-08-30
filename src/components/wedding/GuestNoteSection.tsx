import { motion } from "framer-motion";
import { Language } from "@/data/wedding";

export default function GuestNoteSection({
  language,
}: {
  language: Language;
}) {
  const isArabic = language === "ar";

  const contacts = [
    {
      labelAr: "أهل العروس",
      labelEn: "Bride's Family",
      displayNumber: "76 303 610",
      phoneNumber: "+96176303610",
    },
    {
      labelAr: "أهل العريس",
      labelEn: "Groom's Family",
      displayNumber: "70 066 678",
      phoneNumber: "+96170066678",
    },
  ];

  const whatsappMessage = isArabic
    ? "مرحباً، نود إبلاغكم بخصوص حضور حفل زفاف صلاح وريان."
    : "Hello, we would like to let you know regarding our attendance at Salah & Rayan's wedding.";

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
              ? "يرجى التواصل مع أهل العروس أو أهل العريس بحسب جهة الدعوة. نقدّر تعاونكم وتفهّمكم، ونسعد بمشاركتكم فرحتنا."
              : "Please contact the bride's or groom's family according to the side from which you received your invitation. We truly appreciate your kindness and understanding."}
          </p>

          <div className="guest-family-contacts">
            {contacts.map((contact) => {
              const whatsappUrl =
                `https://wa.me/${contact.phoneNumber.replace(
                  /\D/g,
                  ""
                )}?text=${encodeURIComponent(
                  whatsappMessage
                )}`;

              return (
                <div
                  className="guest-family-contact"
                  key={contact.phoneNumber}
                >
                  <span className="guest-family-label">
                    {isArabic
                      ? contact.labelAr
                      : contact.labelEn}
                  </span>

                  <a
                    href={`tel:${contact.phoneNumber}`}
                    className="guest-phone-number"
                  >
                    <i className="bi bi-telephone-fill" />
                    <span>{contact.displayNumber}</span>
                  </a>

                  <div className="guest-contact-buttons">
                    <a
                      href={`tel:${contact.phoneNumber}`}
                      className="guest-contact-button"
                    >
                      <i className="bi bi-telephone" />
                      <span>
                        {isArabic ? "اتصال" : "CALL"}
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
                        {isArabic ? "واتساب" : "WHATSAPP"}
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="guest-note-bottom">
            ♡
          </div>
        </motion.div>
      </div>
    </section>
  );
}
