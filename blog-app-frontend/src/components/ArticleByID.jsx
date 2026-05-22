import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../axiosConfig";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
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
import { useForm } from "react-hook-form";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

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
    //if aticle is transferred, then use it
    if (article) return;

    //otherwise, make api req to read that article by id
    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`/user-api/article/${id}`);

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
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
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
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
          toast.success("Saved article for later");
        }
      }
    } catch (err) {
      console.error(err);
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

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        "/author-api/articles",
        { articleId: article._id, isArticleActive: newStatus }
      );

      console.log("SUCCESS:", res.data);

      setArticle(res.data.payload);

      //  toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  //edit article
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  //post comment by user
  const addComment = async (commentObj) => {
    //{comment:"user comment"}
    //add artcileId
    commentObj.articleId = article._id;
    console.log(commentObj);
    let res = await axios.put("/user-api/articles", commentObj);
    if (res.status === 200) {
      
      setArticle(res.data.payload);
    }
  };

 // console.log("article",article)


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

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Article Banner Hero */}
      <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 border border-[#e8e8ed]">
        <img
          src={getBannerUrl(article)}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>

      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {user?.role}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>

        {user && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleLike}
              disabled={liking}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${isLiked ? "bg-[#dc2626] text-white hover:bg-[#b91c1c]" : "bg-[#f3f4f6] text-[#1d1d1f] hover:bg-[#e5e7eb]"}`}
            >
              {liking ? "Saving..." : isLiked ? `Liked (${article.likes || 0})` : `Like (${article.likes || 0})`}
            </button>

            {user.role === "USER" && (
              <button
                type="button"
                onClick={toggleSavedArticle}
                disabled={saving}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${isSaved ? "bg-[#1d4ed8] text-white hover:bg-[#1e40af]" : "bg-[#f3f4f6] text-[#1d1d1f] hover:bg-[#e5e7eb]"}`}
              >
                {saving ? "Saving..." : isSaved ? "Saved for later" : "Save for later"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* Recommended articles */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#1d1d1f]">Continue learning</h2>
            <p className="text-sm text-[#6e6e73] mt-1">More related articles from the same author, category, or tags.</p>
          </div>
          {loadingRecommended && <span className="text-sm text-[#6e6e73]">Loading recommendations...</span>}
        </div>

        {recommended.length === 0 ? (
          <p className="text-[#6e6e73] text-sm">No related articles available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommended.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => openArticle(item)}
                className="text-left bg-[#f5f5f7] border border-[#e8e8ed] rounded-3xl overflow-hidden hover:bg-[#ebebf0] transition duration-200"
              >
                <div className="h-32 w-full overflow-hidden relative">
                  <img
                    src={getBannerUrl(item)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#0066cc] mb-2">{item.category}</p>
                  <h3 className="text-base font-semibold text-[#1d1d1f] line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-[#6e6e73] mt-2 line-clamp-2">{item.content}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}
      {/* USER actions */}
      {user?.role === "USER" && (
        <div className={articleActions}>
          <form onSubmit={handleSubmit(addComment)}>
            <input
              type="text"
              {...register("comment")}
              className={inputClass}
              placeholder="Write your comment here..."
            />
            <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-2xl mt-5">
              Add comment
            </button>
          </form>
        </div>
      )}

      {/* comments */}
      {/* Comments */}
      <div className={commentsWrapper}>
        {article.comments?.length === 0 && <p className="text-[#a1a1a6] text-sm text-center">No comments yet</p>}

        {article.comments?.map((commentObj, index) => {
          const name = commentObj.user?.email || "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={commentCard}>
              {/* Header */}
              <div className={commentHeader}>
                <div className={commentUserRow}>
                  <div className={avatar}>{firstLetter}</div>

                  <div>
                    <p className={commentUser}>{name}</p>
                    <p className={commentTime}>{formatDate(commentObj.createdAt || new Date())}</p>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className={commentText}>{commentObj.comment}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;

// {
//   "user":"6989799b7013502767d3f82b",
//   "articleId":"6989750220ce5bf826ec4f7e",
//   "comment":"good article"

// }