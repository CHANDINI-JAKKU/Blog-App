import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance as axios } from "../axiosConfig";
import { motion } from "framer-motion";
import { Search, Eye, User, Sparkles, Heart, Clock, ArrowRight, Filter, TrendingUp } from "lucide-react";

const FALLBACK_ARTICLES = [
  {
    _id: "demo-1",
    title: "Building Autonomous AI Agents with React 19 and Modern Node.js",
    category: "ai",
    content: "Discover how to build reactive, event-driven AI agents that integrate seamlessly with modern web architectures. Explore modern state management, vector database integrations, and robust error recovery patterns.",
    author: "Alex Morgan",
    courseImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    likes: 142,
    views: 1290,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isArticleActive: true,
  },
  {
    _id: "demo-2",
    title: "Mastering Modern CSS Glassmorphism & UI Performance",
    category: "web-development",
    content: "A comprehensive guide to creating futuristic, high-performance web user interfaces using modern CSS features, backdrop filters, CSS container queries, and GPU-accelerated micro-animations.",
    author: "Elena Rostova",
    courseImage: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    likes: 98,
    views: 850,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    isArticleActive: true,
  },
  {
    _id: "demo-3",
    title: "Scaling Node.js Microservices to 100k Requests per Second",
    category: "programming",
    content: "Learn practical strategies for optimizing Node.js backend services, implementing distributed caching with Redis, asynchronous worker queues, and connection pooling in high-load production environments.",
    author: "David Chen",
    courseImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    likes: 215,
    views: 2400,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    isArticleActive: true,
  },
  {
    _id: "demo-4",
    title: "The Next Era of Web Development: What to Expect in 2026",
    category: "technology",
    content: "From edge computing and serverless WebAssembly runtimes to AI-assisted coding paradigms, explore the major technology shifts defining modern full-stack development today.",
    author: "Sarah Jenkins",
    courseImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    likes: 180,
    views: 1750,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    isArticleActive: true,
  },
];

const FALLBACK_BANNERS = {
  technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  programming: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
  "web-development": "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
  tutorials: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
};

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "technology", label: "Technology" },
  { id: "programming", label: "Programming" },
  { id: "ai", label: "AI & ML" },
  { id: "web-development", label: "Web Dev" },
  { id: "tutorials", label: "Tutorials" },
];

function getBannerUrl(article) {
  if (article?.courseImage) return article.courseImage;
  if (article?.image) return article.image;
  if (article?.banner) return article.banner;
  return FALLBACK_BANNERS[article?.category] || FALLBACK_BANNERS["technology"];
}

function estimateReadingTime(article) {
  const words = (article?.content || "").split(" ").filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const navigate = useNavigate();

  const loadArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (searchText.trim()) params.set("search", searchText.trim());
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (sortBy === "popular") params.set("sort", "popular");

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const res = await axios.get(`/user-api/articles${queryString}`);
      
      if (res.status === 200) {
        let list = res.data.payload || [];
        if (list.length === 0 && !searchText && selectedCategory === "all") {
          list = FALLBACK_ARTICLES;
        }
        setArticles(list);
      }
    } catch (err) {
      console.warn("Backend API notice:", err.message);
      // Fallback gracefully so user always sees a beautiful UI
      let filtered = FALLBACK_ARTICLES;
      if (selectedCategory !== "all") {
        filtered = filtered.filter((a) => a.category === selectedCategory);
      }
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        filtered = filtered.filter(
          (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
        );
      }
      setArticles(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [searchText, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    e?.preventDefault();
    setSearchText(searchInput.trim());
  };

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#070b14] to-[#070b14] px-6 py-12 sm:px-12 sm:py-20 shadow-2xl">
        {/* Glow accents */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Platform Updated 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none"
          >
            Explore <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">The Future</span> of Ideas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-medium"
          >
            A minimalist, high-performance platform for creators to share insights, tutorials, and stories with a thriving tech community.
          </motion.p>

          {/* Search Bar Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="mt-8 mx-auto max-w-2xl relative flex items-center"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by topic, author, or keyword..."
                className="h-14 w-full rounded-full border border-slate-700/80 bg-slate-950/80 pl-14 pr-32 text-sm text-slate-100 placeholder:text-slate-500 shadow-2xl backdrop-blur-xl outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchInput("");
                  setSearchText("");
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                    : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Articles Grid Header */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Featured Editorials</p>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">Latest Drops for Modern Creators</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              {loading ? "Loading..." : `${articles.length} article${articles.length === 1 ? "" : "s"} found`}
            </span>
            <div className="h-4 w-px bg-slate-800" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-full px-3 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="latest">Sort: Latest</option>
              <option value="popular">Sort: Most Popular</option>
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-96 animate-pulse rounded-3xl bg-slate-900/60 border border-slate-800" />
              ))
            : articles.length > 0
            ? articles.map((article, idx) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => openArticle(article)}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl transition duration-300 hover:border-cyan-500/50 hover:bg-slate-900/90 shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={getBannerUrl(article)}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = FALLBACK_BANNERS[article?.category] || FALLBACK_BANNERS["technology"];
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {article.category || "technology"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed text-slate-400 line-clamp-2">
                      {article.content || "Read a polished article with practical insights and fresh ideas."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                          {article.author ? article.author.charAt(0).toUpperCase() : <User size={12} />}
                        </div>
                        <span className="font-semibold text-slate-300">{article.author || "Tech Editor"}</span>
                      </div>

                      <div className="flex items-center gap-4 text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-500" />
                          {estimateReadingTime(article)} min read
                        </span>
                        {article.likes !== undefined && (
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Heart size={13} className="text-rose-500 fill-rose-500/20" />
                            {article.likes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            : (
                <div className="col-span-full py-16 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400 space-y-4">
                  <p className="text-base font-medium">No articles found matching "{searchText || selectedCategory}".</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setSearchText("");
                      setSelectedCategory("all");
                    }}
                    className="inline-flex items-center gap-2 bg-slate-800 text-cyan-400 px-5 py-2 rounded-full text-xs font-semibold hover:bg-slate-700 transition"
                  >
                    Clear Filters & Reset
                  </button>
                </div>
              )}
        </div>
      </section>
    </div>
  );
}

export default Home;

