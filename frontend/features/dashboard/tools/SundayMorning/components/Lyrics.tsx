import React from "react";
import { useInView } from "../hooks/useInView";
import { Disc, Music } from "lucide-react";

const LYRICS = {
  romaji: {
    verse1: [
      "Sorry, konnani",
      "Koishii no wa dare no seikashira",
      "Mou ii konnani",
      "Samishiinara kieteyarukara",
    ],
    chorus: [
      "Sunday morning, kimi no koto dare yori koishiteru",
      "Kanashimi mo (Kanashimi mo) oikoshiteiku",
      "Sunday morning, itsu no hi mo dare yori dakishimeru",
      "Mero i koi ni (Mero i koi ni) okkochiteiku tame",
    ],
    verse2: [
      "RG?",
      "Tonari ni",
      "Ite hoshii no wa kimi dakedakara",
      "One, two, three, de kocchi o mite",
      "A-B-C-D, kimi ni yocchaune",
      "Koishiikara bagucchau, one, two, three, four",
      "Yeah",
    ],
    outro: [
      "Gudaguda iukedo kimi ni koishiteruyo",
      "Deredere nacchau tsumi to ikiten no",
      "Nani seikisaki demo kitto sa",
      "Kimi no kokoro ubattesa sekai o sukuu yo",
      "Yanderu hima sura naikara",
      "Kimi to genjitsu ni me gezu yume o ikiteruyo",
      "*Kaze to yuku okkochiteiku tame*",
    ],
  },
  japanese: {
    verse1: [
      "Sorry, こんなに",
      "恋しいのは誰のせいかしら",
      "もういい こんなに",
      "さみしいなら消えてやるから",
    ],
    chorus: [
      "Sunday morning, 君のこと誰より恋してる",
      "悲しみも (悲しみも) 追い越していく",
      "Sunday morning, いつの日も誰より抱きしめる",
      "メロい恋に (メロい恋に) 落っこちていくため",
    ],
    verse2: [
      "RG?",
      "となりに",
      "いて欲しいのは君だけだから",
      "One, two, three, でこっちを見て",
      "A-B-C-D, 君に酔っちゃうね",
      "恋しいからバグっちゃう, one, two, three, four",
      "Yeah",
    ],
    outro: [
      "グダグダ言うけど 君に恋してるよ",
      "デレデレなっちゃう 罪と生きてんの",
      "何世紀先でもきっとさ",
      "君のココロ奪ってさ 世界を救うよ",
      "病んでる暇すらないから",
      "君と現実にメげず 夢を生きてるよ",
      "*風とゆく 落っこちていくため*",
    ],
  },
};

export const Lyrics: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [language, setLanguage] = React.useState<"romaji" | "japanese">(
    "romaji",
  );

  return (
    <section
      id="lyrics"
      className="min-h-[80vh] flex flex-col justify-center items-center p-[var(--sm-space-8)] pt-[calc(var(--sm-space-16)+var(--sm-space-8))] md:p-[var(--sm-space-16)] md:pt-[calc(var(--sm-space-16)+var(--sm-space-8))] bg-[var(--sm-color-surface)] snap-center"
    >
      <div
        ref={ref}
        className="max-w-2xl mx-auto text-center space-y-[var(--sm-space-16)]"
      >
        <div className="relative">
          <h2
            className={`text-[var(--sm-text-3xl)] md:text-[var(--sm-text-4xl)] sm-font-serif text-[var(--sm-color-primary)] transition-all duration-1000 ease-out transform ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Lyrics
          </h2>
          {/* Language Toggle */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 transform transition-all duration-1000 delay-300 ease-out ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <button
              onClick={() =>
                setLanguage((prev) =>
                  prev === "romaji" ? "japanese" : "romaji",
                )
              }
              className="text-[var(--sm-text-xs)] font-bold tracking-widest px-3 py-1 border border-[var(--sm-color-secondary)]/30 rounded-full text-[var(--sm-color-text-muted)] hover:text-[var(--sm-color-primary)] hover:border-[var(--sm-color-primary)] transition-colors uppercase"
            >
              {language === "romaji" ? "JP" : "RO"}
            </button>
          </div>
        </div>

        <div className="space-y-[var(--sm-space-8)] text-[var(--sm-text-xl)] md:text-[var(--sm-text-2xl)] text-[var(--sm-color-primary)] leading-relaxed">
          {/* Verse 1 */}
          <div
            className={`space-y-[var(--sm-space-2)] transition-all duration-1000 delay-200 ease-out transform ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-bold text-[var(--sm-text-sm)] uppercase tracking-widest text-[var(--sm-color-secondary)] mb-2">
              Verse 1
            </p>
            {LYRICS[language].verse1.map((line, i) => (
              <p
                key={i}
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Chorus */}
          <div
            className={`space-y-[var(--sm-space-2)] transition-all duration-1000 delay-300 ease-out transform ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-bold text-[var(--sm-text-sm)] uppercase tracking-widest text-[var(--sm-color-secondary)] mb-2">
              Chorus
            </p>
            {LYRICS[language].chorus.map((line, i) => (
              <p key={i} className="opacity-100 font-medium">
                {line}
              </p>
            ))}
          </div>

          {/* Verse 2 */}
          <div
            className={`space-y-[var(--sm-space-2)] transition-all duration-1000 delay-400 ease-out transform ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-bold text-[var(--sm-text-sm)] uppercase tracking-widest text-[var(--sm-color-secondary)] mb-2">
              Verse 2
            </p>
            {LYRICS[language].verse2.map((line, i) => (
              <p
                key={i}
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Outro */}
          <div
            className={`space-y-[var(--sm-space-2)] transition-all duration-1000 delay-500 ease-out transform ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-bold text-[var(--sm-text-sm)] uppercase tracking-widest text-[var(--sm-color-secondary)] mb-2">
              Outro
            </p>
            {LYRICS[language].outro.map((line, i) => (
              <p
                key={i}
                className={`${i === LYRICS[language].outro.length - 1 ? "opacity-60 italic text-[var(--sm-color-secondary)] mt-4" : "opacity-80 hover:opacity-100 transition-opacity"}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`pt-[var(--sm-space-12)] border-t border-[var(--sm-color-primary)]/10 w-1/2 mx-auto transition-all duration-1000 delay-800 ease-out transform ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center gap-[var(--sm-space-8)]">
            <a
              href="https://open.spotify.com/track/6rjpIfWNWwzg7hd1KxDK5f"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--sm-color-secondary)] hover:text-[var(--sm-color-primary)] transition-colors hover:scale-110 transform duration-300"
              aria-label="Spotify"
            >
              <Disc size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
