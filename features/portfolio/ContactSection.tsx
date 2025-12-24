
import React from 'react';
import AnimatedText from '../../components/ui/AnimatedText';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="CONTACT" className="snap-section flex flex-col items-center justify-center relative">
          <AnimatedText text={t.contact.title} className="text-5xl md:text-8xl font-black opacity-10 absolute top-20 select-none" />
          <div className="text-center">
            <a href={`mailto:${t.contact.email}`} className="text-3xl md:text-5xl font-bold hover:text-orange-500 transition-colors block mb-4 underline decoration-orange-500 underline-offset-8">
              {t.contact.email}
            </a>
            <p className="text-neutral-500 tracking-[0.3em] text-xs font-mono uppercase">{t.contact.social}</p>
          </div>

          <footer className="absolute bottom-10 left-0 w-full flex flex-col items-center space-y-4 px-6 text-xs text-neutral-500">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
              <a href="#" className="hover:text-white transition-colors">GITHUB</a>
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            </div>
            <p>© 2024 VON.CORE ALL RIGHTS RESERVED.</p>
          </footer>
        </section>
    );
}
export default ContactSection;
