import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../axiosConfig";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Heart, Bookmark, Share2, Calendar, User, Clock, ArrowLeft, Send, Trash2, Edit3, Sparkles } from "lucide-react";
import {
  articlePageWrapper,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [saving, setSaving] = useState(false);
  const [liking, setLiking] = useState(false);

  const savedArticleIds = user?.savedArticles?.map((item) => (item?._id ? item._id.toString() : item.toString())) || [];
  const isSaved = !!(article && savedArticleIds.includes(article._id?.toString()));
  const isLiked = !!article?.isLiked;

  useEffect(() => {
    if (article && article._id === id) return;

    const getArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/user-api/article/${id}`);
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || err.response?.data?.error || "Unable to load article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  useEffect(() => {
    if (!article) return;

    const loadRecommended = async () => {
      setLoadingRecommended(true);
      try {
        const res = await axios.get(`/user-api/articles/recommended/${article._id}`);
        if (res.status === 200) {
          setRecommended(res.data.payload || []);
        }
      } catch (err) {
        console.warn("Failed to load recommended articles", err);
      } finally {
        setLoadingRecommended(false);
      }
    };

    loadRecommended();
  }, [article]);

  const formatDate = (date) => {
    if (!date) return "Recently";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const openArticle = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  const toggleSavedArticle = async () => {
    if (!article) return;
    if (!user) {
      toast.error("Please log in to save articles.");
      return;
    }

    setSaving(true);
    try {
      if (isSaved) {
        const res = await axios.delete(`/user-api/saved-articles/${article._id}`);
        if (res.status === 200) {
          useAuth.setState({
            currentUser: { ...user, savedArticles: res.data.payload },
          });
          toast.success("Removed from saved articles");
        }
      } else {
        const res = await axios.post("/user-api/saved-articles", {
          articleId: article._id,
        });
        if (res.status === 200) {
          useAuth.setState({
            currentUser: { ...user, savedArticles: res.data.payload },
          });
          toast.success("Article saved for later");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update saved articles.");
    } finally {
      setSaving(false);
    }
  };

  const toggleLike = async () => {
    if (!article) return;
    if (!user) {
      toast.error("Please log in to like articles.");
      return;
    }

    setLiking(true);
    try {
      const res = await axios.post("/user-api/articles/like", {
        articleId: article._id,
      });
      if (res.status === 200) {
        setArticle(res.data.payload);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update like status.");
    } finally {
      setLiking(false);
    }
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch("/author-api/articles", {
        articleId: article._id,
        isArticleActive: newStatus,
      });
      setArticle(res.data.payload);
      toast.success(newStatus ? "Article restored" : "Article deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  const addComment = async (commentObj) => {
    if (!commentObj.comment?.trim()) return;
    try {
      commentObj.articleId = article._id;
      let res = await axios.put("/user-api/articles", commentObj);
      if (res.status === 200) {
        setArticle(res.data.payload);
        reset();
        toast.success("Comment added!");
      }
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };

  const getBannerUrl = (art) => {
    if (art?.courseImage) return art.courseImage;
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
  };

  if (loading) return <div className={loadingClass}>Loading article details...</div>;
  if (error) return <div className="max-w-xl mx-auto my-12 p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center">{error}</div>;
  if (!article) return null;

  return (
    <div className={`${articlePageWrapper} space-y-8`}>
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition mb-2 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to Articles
      </button>

      {/* Hero Banner Image */}
      <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl bg-slate-950">
        <img
          src={getBannerUrl(article)}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <span className={articleCategory}>{article.category || "Technology"}</span>
          {article.isArticleActive === false && (
            <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Deleted / Archived
            </span>
          )}
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className={articleMainTitle}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
              {article.author ? (typeof article.author === "string" ? article.author.charAt(0).toUpperCase() : "A") : "A"}
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {typeof article.author === "string" ? article.author : article.author?.firstName || "Tech Author"}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Calendar size={12} /> Published on {formatDate(article.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <Clock size={14} className="text-cyan-400" /> 5 min read
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLike}
              disabled={liking}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-lg cursor-pointer ${
                isLiked
                  ? "bg-rose-500 text-white shadow-rose-500/20"
                  : "bg-slate-900/90 border border-slate-800 text-slate-200 hover:border-rose-500/40 hover:text-rose-400"
              }`}
            >
              <Heart size={16} className={isLiked ? "fill-white" : ""} />
              <span>{article.likes || 0} Likes</span>
            </button>

            {user?.role === "USER" && (
              <button
                type="button"
                onClick={toggleSavedArticle}
                disabled={saving}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  isSaved
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-cyan-500/20"
                    : "bg-slate-900/90 border border-slate-800 text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300"
                }`}
              >
                <Bookmark size={16} className={isSaved ? "fill-slate-950" : ""} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            )}
          </div>

          {/* Author control buttons */}
          {user?.role === "AUTHOR" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => editArticle(article)}
                className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold px-4 py-2 rounded-full hover:bg-cyan-500/20 transition cursor-pointer"
              >
                <Edit3 size={14} /> Edit
              </button>

              <button
                onClick={toggleArticleStatus}
                className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold px-4 py-2 rounded-full hover:bg-rose-500/20 transition cursor-pointer"
              >
                <Trash2 size={14} /> {article.isArticleActive ? "Delete" : "Restore"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Article Body */}
      <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed text-base sm:text-lg whitespace-pre-line py-4">
        {article.content}
      </div>

      {/* Comments Section */}
      <section className="pt-8 border-t border-slate-800 space-y-6">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span>Discussion ({article.comments?.length || 0})</span>
        </h3>

        {/* Add Comment Form */}
        {user?.role === "USER" ? (
          <form onSubmit={handleSubmit(addComment)} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              {...register("comment", { required: true })}
              className={`${inputClass} flex-1`}
              placeholder="Share your thoughts on this article..."
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition shadow-lg cursor-pointer"
            >
              <Send size={14} /> Comment
            </button>
          </form>
        ) : !user ? (
          <p className="text-xs text-slate-400 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 text-center">
            Log in as a user to post a comment.
          </p>
        ) : null}

        {/* Comment Cards List */}
        <div className={commentsWrapper}>
          {(!article.comments || article.comments.length === 0) ? (
            <p className="text-slate-500 text-sm text-center py-6">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            article.comments.map((commentObj, index) => {
              const name = commentObj.user?.firstName || commentObj.user?.email || "Community Member";
              const initial = name.charAt(0).toUpperCase();

              return (
                <div key={index} className={commentCard}>
                  <div className={commentHeader}>
                    <div className={commentUserRow}>
                      <div className={avatar}>{initial}</div>
                      <div>
                        <p className={commentUser}>{name}</p>
                        <p className={commentTime}>{formatDate(commentObj.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <p className={commentText}>{commentObj.comment}</p>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Recommended Articles Section */}
      {recommended.length > 0 && (
        <section className="pt-12 border-t border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <h2 className="text-2xl font-extrabold text-white">Recommended Readings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recommended.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => openArticle(item)}
                className="text-left bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/40 hover:bg-slate-900/90 transition duration-300 cursor-pointer shadow-lg group flex flex-col"
              >
                <div className="h-36 w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={getBannerUrl(item)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col grow">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Footer Meta */}
      <div className={articleFooter}>
        Article ID: <span className="font-mono text-xs text-slate-400">{article._id}</span>
      </div>
    </div>
  );
}

export default ArticleByID;