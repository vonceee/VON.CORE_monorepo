import React from "react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useLanguage } from "../../context/LanguageContext";

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section
      id="CONTACT"
      className="snap-section flex flex-col items-center justify-center relative"
    >
      <AnimatedText
        text={t.contact.title}
        className="text-7xl md:text-[10rem] font-black opacity-10 absolute top-20 select-none"
      />
      <div className="text-center">
        <a
          href={`mailto:${t.contact.email}`}
          className="text-4xl md:text-6xl lg:text-7xl font-bold hover:text-primary transition-colors block mb-4 underline decoration-primary underline-offset-8"
        >
          {t.contact.email}
        </a>
        <p className="text-neutral-500 tracking-[0.3em] text-sm md:text-base font-mono uppercase">
          {t.contact.social}
        </p>
      </div>

      <footer className="absolute bottom-10 left-0 w-full flex flex-col items-center space-y-4 px-6 text-sm md:text-base text-neutral-500">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">
            LINKEDIN
          </a>
          <a href="#" className="hover:text-white transition-colors">
            GITHUB
          </a>
          <a href="#" className="hover:text-white transition-colors">
            INSTAGRAM
          </a>
        </div>
        <p>© 2024 VON.CORE ALL RIGHTS RESERVED.</p>
      </footer>
    </section>
  );
};
export default ContactSection;
