import { useEffect, useState, useRef } from "react";
import { axiosInstance as axios } from "../axiosConfig";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("user in author profile", user);

  const articlesLoaded = useRef(false);

  useEffect(() => {
    if (!user || articlesLoaded.current) return;

    const getAuthorArticles = async () => {
      try {
        setLoading(true);
        //read articles of current author
        let res = await axios.get("/author-api/articles");
        if (res.status === 200) {
          setArticles(res.data.payload);
          articlesLoaded.current = true;
        }
        //update articles state
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user?._id]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const getBannerUrl = (article) => {
    if (article.courseImage) return article.courseImage;

    const fallbacks = {
      technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      programming: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      "web-development": "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    };
    return fallbacks[article.category] || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any articles yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {articles.map((article) => (
        <div
          key={article._id}
          className="bg-[#f5f5f7] rounded-3xl overflow-hidden border border-[#e8e8ed] hover:bg-[#ebebf0] transition duration-200 flex flex-col cursor-pointer relative group"
          onClick={() => openArticle(article)}
        >
          {/* Status Badge */}
          <span className={`${article.isArticleActive ? articleStatusActive : articleStatusDeleted} z-10`}>
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
          </span>

          {/* Banner Image */}
          <div className="h-40 w-full overflow-hidden relative">
            <img
              src={getBannerUrl(article)}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#0066cc] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {article.category}
            </span>
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <h4 className="text-sm font-semibold text-[#1d1d1f] leading-snug tracking-tight line-clamp-2">
              {article.title}
            </h4>

            <p className="text-xs text-[#6e6e73] mt-2 line-clamp-2 leading-relaxed">
              {article.content}
            </p>

            {/* BOTTOM INFO */}
            <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#e8e8ed] mt-3">
              <span className="text-[10px] text-[#a1a1a6]">
                {formatDate(article.createdAt)}
              </span>
              <span className="text-[#0066cc] text-[11px] font-semibold hover:text-[#004499] flex items-center gap-0.5">
                Read →
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;