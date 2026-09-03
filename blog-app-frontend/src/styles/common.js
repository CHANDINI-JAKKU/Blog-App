// src/styles/common.js
// Theme: Cyberpunk/SaaS Dark Glass - Deep slate background (#070b14), cyan/indigo accents, crisp typography

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#070b14] text-slate-100 min-h-screen";
export const pageWrapper = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8";
export const section = "mb-10";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-7 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none mb-3";
export const headingClass = "text-2xl font-bold text-white tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-slate-200 tracking-tight";
export const bodyText = "text-slate-300 leading-relaxed text-sm sm:text-base";
export const mutedText = "text-sm text-slate-400";
export const linkClass = "text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-2.5 rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer text-sm tracking-tight";
export const secondaryBtn =
  "inline-flex items-center justify-center border border-slate-700 bg-slate-800/60 text-slate-200 font-medium px-5 py-2.5 rounded-full hover:bg-slate-700/60 hover:border-slate-600 transition-all cursor-pointer text-sm";
export const ghostBtn = "text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-xl mx-auto shadow-2xl relative overflow-hidden";
export const formTitle = "text-3xl font-extrabold text-white tracking-tight text-center mb-8";
export const labelClass = "text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 block";
export const inputClass =
  "w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition duration-200";
export const formGroup = "mb-5";
export const submitBtn =
  "w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-[0.99] cursor-pointer mt-3 text-sm tracking-wide uppercase";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-[#070b14]/80 backdrop-blur-xl border-b border-slate-800/80 h-16 flex items-center sticky top-0 z-50 w-full";
export const navContainerClass = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between";
export const navBrandClass = "text-xl font-extrabold text-white tracking-tight flex items-center gap-2";
export const navLinksClass = "flex items-center gap-6";
export const navLinkClass = "text-sm text-slate-300 hover:text-white transition-colors font-medium";
export const navLinkActiveClass = "text-sm text-cyan-400 font-semibold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-cyan-400 after:rounded-full";

// ─── Footer ───────────────────────────────────────────
export const footerClass = "bg-[#05080f] border-t border-slate-800/80 py-12 text-slate-400 w-full mt-auto";
export const footerContainerClass = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6";
export const footerLinkClass = "text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium";
export const footerTextClass = "text-slate-500 text-sm";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-slate-900/60 backdrop-blur-lg border border-slate-800 p-6 rounded-3xl hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col gap-3 cursor-pointer shadow-lg";
export const articleTitle = "text-lg font-bold text-white leading-snug tracking-tight group-hover:text-cyan-300 transition-colors";
export const articleExcerpt = "text-sm text-slate-400 leading-relaxed";
export const articleMeta = "text-xs text-slate-500";
export const articleBody = "text-slate-300 leading-relaxed text-base max-w-3xl";
export const timestampClass = "text-xs text-slate-400 flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12";
export const articleHeader = "mb-10 flex flex-col gap-4";
export const articleCategory = "text-[0.7rem] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full w-fit";
export const articleMainTitle = "text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight";
export const articleAuthorRow =
  "flex items-center justify-between border-y border-slate-800 py-4 text-sm text-slate-400";
export const authorInfo = "flex items-center gap-2 font-medium text-slate-200";
export const articleContent = "text-slate-200 leading-loose text-base sm:text-lg space-y-6 mt-8";
export const articleFooter = "border-t border-slate-800 mt-12 pt-6 text-sm text-slate-500";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex flex-wrap gap-3 mt-8";
export const editBtn = "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-semibold px-5 py-2 rounded-full hover:bg-cyan-500/30 transition cursor-pointer";
export const deleteBtn = "bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-semibold px-5 py-2 rounded-full hover:bg-rose-500/30 transition cursor-pointer";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-2xl px-4 py-3 text-sm font-medium my-3";
export const successClass =
  "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-2xl px-4 py-3 text-sm font-medium my-3";
export const loadingClass = "text-cyan-400 text-sm animate-pulse text-center py-8 font-medium";
export const emptyStateClass = "text-center text-slate-400 py-12 text-sm bg-slate-900/40 rounded-3xl border border-slate-800";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper = "mt-12 flex flex-col gap-4";
export const commentCard = "bg-slate-900/60 border border-slate-800 rounded-2xl p-5 transition hover:border-slate-700";
export const commentHeader = "flex items-center justify-between mb-2";
export const commentUser = "text-sm font-semibold text-slate-200";
export const commentTime = "text-xs text-slate-500";
export const commentText = "text-slate-300 text-sm leading-relaxed mt-2";
export const avatar =
  "w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-md";
export const commentUserRow = "flex items-center gap-3";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-slate-800/80 my-8";