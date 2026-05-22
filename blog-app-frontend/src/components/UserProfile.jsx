import { useEffect, useState, useRef } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { axiosInstance as axios } from "../axiosConfig";

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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white border border-[#e8e8ed] rounded-3xl p-6 mb-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-16 h-16 rounded-full object-cover border"
              alt="profile"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xl font-semibold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <p className="text-sm text-[#6e6e73]">Welcome back</p>
            <h2 className="text-xl font-semibold text-[#1d1d1f]">{currentUser?.firstName}</h2>
          </div>
        </div>

        <button
          className="bg-[#ff3b30] text-white text-sm px-5 py-2 rounded-full hover:bg-[#d62c23] transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1d1d1f]">Saved Articles</h3>
            <p className="text-sm text-[#6e6e73] mt-1">Your bookmarked articles to review later.</p>
          </div>
          <span className="text-sm text-[#6e6e73]">
            {savedArticles.length} saved {savedArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {savedError && <p className="text-sm text-red-600 mb-4">{savedError}</p>}

        {loadingSaved ? (
          <p className="text-sm text-[#6e6e73]">Loading saved articles...</p>
        ) : savedArticles.length === 0 ? (
          <p className="text-[#a1a1a6] text-sm text-center py-10">No saved articles yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {savedArticles.map((article) => (
              <button
                key={article._id}
                type="button"
                onClick={() => openArticle(article)}
                className="bg-[#f5f5f7] rounded-3xl border border-[#e8e8ed] p-5 text-left hover:bg-[#ebebf0] transition duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-semibold text-[#1d1d1f] line-clamp-2">{article.title}</h4>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#0066cc] mt-2">{article.category}</p>
                  </div>
                  <span className="text-xs text-[#6e6e73]">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-[#6e6e73] mt-3 line-clamp-3">{article.content}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;