import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance as axios } from "../axiosConfig";
import { motion } from "framer-motion";
import { Search, Eye, User } from "lucide-react";

const FALLBACK_BANNERS = {
  technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  programming: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
  "web-development": "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
  tutorials: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
};

function getBannerUrl(article) {
  if (article?.courseImage) return article.courseImage;
  if (article?.image) return article.image;
  if (article?.banner) return article.banner;
  return FALLBACK_BANNERS[article?.category] || FALLBACK_BANNERS["technology"];
}

function estimateReadingTime(article) {
  const words = (article.content || "").split(" ").filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (searchText.trim()) params.set("search", searchText.trim());
    return params.toString() ? `?${params.toString()}` : "";
  };

  const loadArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`/user-api/articles${buildQuery()}`);
      if (res.status === 200) {
        setArticles(res.data.payload || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [searchText]);

  const handleSearch = () => {
    setSearchText(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchText("");
  };

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  return (
    <div className="flex justify-center w-full overflow-x-hidden bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-b from-slate-900 via-[#020617] to-slate-950 px-6 py-10 shadow-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_30%)]" />
          <div className="pointer-events-none absolute right-0 top-12 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-4 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-cyan-300">
              Platform Updated 2026
            </span>
            <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              Explore <span className="text-cyan-300">The Future</span> of Ideas
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              A minimalist, high-performance platform for creators to share insights, tutorials, and stories with a thriving tech community.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <div className="relative w-full max-w-2xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="                    Search by topic, author, or keyword..."
                  className="h-14 w-full rounded-full border border-slate-700 bg-slate-900/80 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.75)] outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex h-14 items-center justify-center rounded-full bg-cyan-400 px-6 text-sm font-semibold text-slate-950 shadow-xl transition hover:bg-cyan-300"
              >
                Search
              </button>
            </div>

            
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Featured editorials</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Latest drops for modern creators.</h2>
            </div>
            <p className="text-sm text-slate-400">
              {loading ? 'Searching...' : `${articles.length} article${articles.length === 1 ? '' : 's'} available`}
            </p>
          </div>

          {error && (
            <div className="rounded-3xl border border-red-600/30 bg-red-600/10 px-5 py-4 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-96 animate-pulse rounded-4xl bg-slate-900/60" />
                ))
              : articles.length
              ? articles.map((article) => (
                  <motion.button
                    key={article._id}
                    whileHover={{ y: -6 }}
                    type="button"
                    onClick={() => openArticle(article)}
                    className="group flex h-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-slate-950/90 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={getBannerUrl(article)}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = FALLBACK_BANNERS[article?.category] || FALLBACK_BANNERS['technology'];
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-5 text-left grow">
                      <div>
                        <h3 className="text-xl font-semibold text-white line-clamp-2">{article.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-2">
                          {article.content || 'Read a polished article with practical insights and fresh ideas.'}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <User className="h-4 w-4" /> {article.author || 'Unknown'}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Eye className="h-4 w-4" /> {estimateReadingTime(article)} min
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))
              : (
                  <div className="rounded-4xl border border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">
                    No articles found. Try a different search term.
                  </div>
                )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

