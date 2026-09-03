import { Sparkles, Heart, Globe, Share2, Code } from "lucide-react";
import { footerClass, footerContainerClass } from "../styles/common";
import { NavLink } from "react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerClass}>
      <div className={footerContainerClass}>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800/80">
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">MyBlog</span>
            </NavLink>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              A futuristic, high-performance publishing platform for modern software engineers, designers, and creators.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><NavLink to="/" className="text-slate-400 hover:text-cyan-400 transition">Latest Articles</NavLink></li>
              <li><NavLink to="/" className="text-slate-400 hover:text-cyan-400 transition">Technology & AI</NavLink></li>
              <li><NavLink to="/" className="text-slate-400 hover:text-cyan-400 transition">Web Development</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><NavLink to="/login" className="text-slate-400 hover:text-cyan-400 transition">Author Dashboard</NavLink></li>
              <li><NavLink to="/register" className="text-slate-400 hover:text-cyan-400 transition">Become a Writer</NavLink></li>
              <li><NavLink to="/" className="text-slate-400 hover:text-cyan-400 transition">Community Guidelines</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Website" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition">
                <Globe size={16} />
              </a>
              <a href="#" aria-label="Source Code" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition">
                <Code size={16} />
              </a>
              <a href="#" aria-label="Share Platform" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition">
                <Share2 size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} MyBlog Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-rose-500 fill-rose-500" /> for modern creators
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;