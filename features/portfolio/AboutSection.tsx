import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Code2,
  Layers,
  Database,
  Server,
  ChessPawn,
  Sparkles,
  Zap,
  ShieldCheck,
  Rocket,
  Wrench,
  Phone,
} from "lucide-react";

interface AboutSectionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section
      id="ABOUT"
      className="snap-section min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="w-full max-w-6xl 2xl:max-w-7xl flex flex-col justify-center">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4 border-b border-white/10 pb-5">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              VON CEDRIC <span className="text-cyan-400">RAÑOLA</span>
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5 text-sm text-neutral-400">
            <span className="text-md text-white font-medium leading-relaxed">
              JUNIOR FULL-STACK
            </span>
            <div className="flex flex-wrap items-center sm:justify-end gap-3 sm:gap-4">
              <a
                href="mailto:alonarvoncedric@gmail.com"
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail size={14} />
                <span>alonarvoncedric@gmail.com</span>
              </a>
              <a
                href="tel:09612941853"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone size={14} />
                <span>09612941853</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Card 1: Bio & Philosophy (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 sm:p-7 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <p className="text-white font-light text-lg sm:text-xl leading-relaxed tracking-wider">
                I am a passionate and results-oriented developer with a strong foundation in both frontend and backend technologies. Specializing in (<span className="text-white font-medium">React</span>, <span className="text-white font-medium">Angular</span>, <span className="text-white font-medium">TypeScript</span>) and structured backend architectures (<span className="text-white font-medium">Laravel/PHP</span>, <span className="text-white font-medium">REST APIs</span>, <span className="text-white font-medium">MySQL</span>). Focuses on delivering clean, maintainable code.
              </p>
            </div>
          </div>

          {/* Card 2: Education & Academic Credentials (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 sm:p-7 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                    EDUCATION
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    National University - Fairview
                  </h4>
                </div>
              </div>

              <div className="p-3 mb-4">
                <div className="text-sm text-cyan-400 mb-1">DEGREE PROGRAM</div>
                <div className="text-lg font-semibold text-white mb-1">
                  Bachelor of Science in Information Technology
                </div>
                <div className="text-sm text-neutral-400">
                  Specialization in Mobile & Internet Technology
                </div>
                <div className="mt-2 inline-block px-2 py-0.5 rounded bg-white/5 text-[14px] text-neutral-300 border border-white/10">
                  2022 – 2026
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Technical Stack & Competencies (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 sm:p-7 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-2xl tracking-widest text-white uppercase mb-2">
                  TECHNICAL STACK
                </h4>
              </div>

              <div className="space-y-3.5">
                {/* Frontend */}
                <div>
                  <div className="flex items-center gap-1.5 text-md text-neutral-400 mb-1.5">
                    <Layers size={16} className="text-cyan-400" />
                    <span>FRONTEND ARCHITECTURE</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "Angular", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-sm bg-white/5 border border-white/10 text-neutral-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <div className="flex items-center gap-1.5 text-md text-neutral-400 mb-1.5">
                    <Server size={16} className="text-indigo-400" />
                    <span>BACKEND & APIS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["PHP", "Laravel", "RESTful APIs", "MVC Pattern", "Eloquent ORM", "Auth & Middleware"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-sm bg-white/5 border border-white/10 text-neutral-200 hover:border-indigo-400/50 hover:text-indigo-300 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Database & Realtime */}
                <div>
                  <div className="flex items-center gap-1.5 text-md text-neutral-400 mb-1.5">
                    <Database size={16} className="text-emerald-400" />
                    <span>TOOLS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["MySQL", "WebSockets", "Git & GitHub", "Postman", "Jira/Trello"].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-sm bg-white/5 border border-white/10 text-neutral-200 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Engineering Principles - What I Bring to a Team (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 sm:p-7 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-colors">
                  <div className="text-md font-bold text-white flex items-center gap-1.5 mb-1">
                    <span className="text-cyan-400">01.</span> Performance-First Engineering
                  </div>
                  <p className="text-md text-neutral-400 font-light leading-relaxed">
                    Zero unnecessary dependencies, targeted database indexes, and efficient asset pipelines so end-users never experience latency lag.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-colors">
                  <div className="text-md font-bold text-white flex items-center gap-1.5 mb-1">
                    <span className="text-cyan-400">02.</span> Resilient & Clean Architecture
                  </div>
                  <p className="text-md text-neutral-400 font-light leading-relaxed">
                    Structured component boundaries, explicit type definitions, and readable code that other developers can extend effortlessly.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-colors">
                  <div className="text-md font-bold text-white flex items-center gap-1.5 mb-1">
                    <span className="text-cyan-400">03.</span> Fast Execution & Adaptability
                  </div>
                  <p className="text-md text-neutral-400 font-light leading-relaxed">
                    Self-driven work ethic with rapid ramp-up time on new frameworks, libraries, and internal tooling with disciplined git hygiene.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Connect / Socials (12 cols) */}
          <div className="lg:col-span-12 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-5 sm:p-6 hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-left">
                <div>
                  <div className="text-md font-bold tracking-widest text-white uppercase">
                    CONNECT_
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="https://github.com/vonceee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 hover:border-cyan-400 text-xs font-medium transition-all"
                >
                  <Github size={14} />
                  <span>GITHUB</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/von-cedric-ra%C3%B1ola-3908222aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 hover:border-cyan-400 text-xs font-medium transition-all"
                >
                  <Linkedin size={14} />
                  <span>LINKEDIN</span>
                </a>

                <a
                  href="https://www.chess.com/member/yunahafk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 hover:border-cyan-400 text-xs font-medium transition-all"
                >
                  <ChessPawn size={14} />
                  <span>CHESS.COM</span>
                </a>

                <a
                  href="mailto:alonarvoncedric@gmail.com"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 hover:border-cyan-400 text-xs font-medium transition-all"
                >
                  <Mail size={14} />
                  <span>EMAIL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutSection);
