function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800/50">
      <div className="px-6 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">MyBlog</h3>
              <p className="text-slate-400 text-sm">
                Discover inspiring articles and ideas for modern creators.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-slate-500 text-sm">
                &copy; {currentYear} MyBlog. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">Twitter</a>
                <a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">GitHub</a>
                <a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;