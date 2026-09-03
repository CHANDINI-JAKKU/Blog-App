import { useEffect, useState, useRef } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { axiosInstance as axios } from "../axiosConfig";
import { Bookmark, LogOut, Sparkles, User, Clock, ArrowRight } from "lucide-react";
import { pageWrapper, divider } from "../styles/common";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [savedArticles, setSavedArticles] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [savedError, setSavedError] = useState(null);

  const savedLoaded = useRef(false);

  useEffect(() => {
    if (!currentUser?._id || savedLoaded.current) return;

    const loadSavedArticles = async () => {
      setLoadingSaved(true);
      try {
        const res = await axios.get("/user-api/saved-articles");
        if (res.status === 200) {
          setSavedArticles(res.data.payload || []);
          savedLoaded.current = true;
        }
      } catch (err) {
        setSavedError(err.response?.data?.message || "Failed to load saved articles.");
      } finally {
        setLoadingSaved(false);
      }
    };

    loadSavedArticles();
  }, [currentUser?._id]);

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  return (
    <div className={pageWrapper}>
      {/* USER PROFILE HEADER */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5">
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg"
              alt="profile"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/20">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Reader (User)
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
          </div>
        </div>

        <button
          className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer"
          onClick={onLogout}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      {/* SAVED ARTICLES SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-cyan-400" />
            <h3 className="text-xl font-extrabold text-white">Your Bookmarks & Saved Articles</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
            {savedArticles.length} {savedArticles.length === 1 ? "article" : "articles"} saved
          </span>
        </div>

        {savedError && <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">{savedError}</div>}

        {loadingSaved ? (
          <p className="text-cyan-400 text-xs animate-pulse">Loading saved articles...</p>
        ) : savedArticles.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <p className="text-sm">No saved articles yet.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Explore the home feed and click the "Save" button on any article to keep it in your personal reading list.</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-full hover:from-cyan-400 hover:to-blue-500 shadow-md cursor-pointer"
            >
              Explore Feed <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {savedArticles.map((article) => (
              <button
                key={article._id}
                type="button"
                onClick={() => openArticle(article)}
                className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 text-left hover:border-cyan-500/40 hover:bg-slate-900/90 transition duration-300 cursor-pointer shadow-lg group flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase">
                    {article.category || "General"}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-2">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-auto">
                  {article.content}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;