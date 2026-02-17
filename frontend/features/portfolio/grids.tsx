<div className="grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-3 h-full grow">
  {/* Item 1: Title (Top Left, Span 2) */}
  <div className="md:col-span-2 md:row-span-1 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center relative overflow-hidden group border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors duration-300"></div>

  {/* Item 2: Visual/Spline (Top Right, Span 1) */}
  <div className="md:col-span-1 md:row-span-1 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative group border border-slate-200 dark:border-zinc-700 p-4 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors duration-300">
    <div className="absolute top-4 left-6 z-10 font-mono text-xs uppercase tracking-widest opacity-60">
      Socials
    </div>
    <div className="w-full h-full pt-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
        <a
          href="https://github.com/vonceee"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-black dark:text-gray-300 dark:hover:text-black dark:hover:bg-white transition-all duration-300 group/icon"
        >
          <Github
            size={40}
            className="transform group-hover transition-transform"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/voncedric"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#0077b5] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#0077b5] transition-all duration-300 group/icon"
        >
          <Linkedin
            size={40}
            className="transform group-hover transition-transform"
          />
        </a>
        <a
          href="https://www.instagram.com/voncedric"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#E1306C] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#E1306C] transition-all duration-300 group/icon"
        >
          <Instagram
            size={40}
            className="transform group-hover transition-transform"
          />
        </a>
        <a
          href="https://www.facebook.com/people/VonDev/61585149598227/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white dark:bg-black/20 text-gray-600 hover:text-white hover:bg-[#1877F2] dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#1877F2] transition-all duration-300 group/icon"
        >
          <Facebook
            size={40}
            className="transform group-hover transition-transform"
          />
        </a>
      </div>
    </div>
  </div>

  {/* Item 3: Skills (Mid Left, Span 1, Tall) */}
  <div className="md:col-span-1 md:row-span-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white p-6 flex flex-col justify-between group relative overflow-hidden border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors duration-300">
    <div className="absolute top-[-20%] right-[-20%] w-32 h-32 rounded-full blur-2xl opacity-50 bg-slate-300 dark:bg-zinc-700"></div>
    <span className="font-sans text-md tracking-widest text-justify opacity-80 z-10">
      ~{t.about.description}
    </span>
  </div>

  {/* Item 4: Resume/CV (Mid Center, Span 1) */}
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="md:col-span-1 md:row-span-1 bg-white dark:bg-zinc-900 p-6 flex flex-col items-center justify-center text-center group border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors duration-300 cursor-pointer text-slate-900 dark:text-white"
  >
    <div className="mb-2 group-hover:scale-125 transition-transform duration-300">
      <FileText size={40} className="stroke-1" />
    </div>
    <div className="text-xl font-bold uppercase">Resume</div>
    <div className="text-sm opacity-60">View / Download</div>
  </a>

  {/* Item 5: Bio Picture (Right Vertical, Span 1, RowSpan 2) */}
  <div className="md:col-span-1 md:row-span-2 bg-neutral-900 border border-slate-200 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors duration-300 relative overflow-hidden group p-0">
    <img
      src={aesImage}
      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
  </div>

  {/* Item 7: Tech Stack */}
  <div
    onClick={() => setIsStackModalOpen(true)}
    className="md:col-span-1 md:row-span-1 bg-neutral-900 text-white dark:bg-zinc-800 dark:text-white p-6 flex flex-col justify-between border border-transparent hover:border-slate-400 dark:hover:border-zinc-400 transition-colors duration-300 group relative overflow-hidden cursor-pointer"
  >
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex overflow-hidden w-full">
        <div className="flex flex-col gap-2 w-full">
          <Marquee
            gradient={false}
            speed={40}
            direction="left"
            pauseOnHover={true}
            className="flex items-center gap-4 py-2"
          >
            <div className="flex gap-4 pr-4">
              {BADGES.map((badge, index) => (
                <img
                  key={index}
                  src={badge}
                  alt="Tech Badge"
                  className="h-8 md:h-12 w-auto object-contain shrink-0"
                />
              ))}
            </div>
          </Marquee>
          <Marquee
            gradient={false}
            speed={40}
            direction="right"
            pauseOnHover={true}
            className="flex items-center gap-4 py-2"
          >
            <div className="flex gap-4 pr-4">
              {BADGES.map((badge, index) => (
                <img
                  key={index}
                  src={badge}
                  alt="Tech Badge"
                  className="h-8 md:h-12 w-auto object-contain shrink-0"
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  </div>
</div>;

{
  /* Tech Stack Modal */
}
<AnimatePresence>
  {isStackModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsStackModalOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xl p-6 md:p-8"
      >
        <button
          onClick={() => setIsStackModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(TECH_STACK).map(([category, items]) => (
            <div
              key={category}
              className="bg-slate-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-slate-100 dark:border-zinc-700/50"
            >
              <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-zinc-700 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="Badge"
                    className="h-8 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>;
