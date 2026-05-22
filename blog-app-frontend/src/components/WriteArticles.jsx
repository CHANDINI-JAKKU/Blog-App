import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { axiosInstance as axios } from "../axiosConfig";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";
import { useAuth } from "../store/authStore";

const BANNER_PRESETS = [
  {
    id: "technology",
    label: "Technology",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "programming",
    label: "Programming",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai",
    label: "AI & ML",
    url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "web-development",
    label: "Web Dev",
    url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
  },
];

function WriteArticles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const category = watch("category");

  useEffect(() => {
    if (category) {
      const match = BANNER_PRESETS.find((preset) => preset.id === category);
      if (match) {
        setSelectedImage(match.url);
      }
    }
  }, [category]);

  //save article
  const submitArticle = async (articleObj) => {
    setLoading(true);

    //add authorId and courseImage to articleObj
    articleObj.author = currentUser._id;
    articleObj.courseImage = selectedImage;
    try {
      //set loading true
      setLoading(true);
      //make POST req to save new article
      let res = await axios.post("/author-api/article", articleObj);
      //navigate to AuthorArticles
      if (res.status === 201) {
        toast.success("Article published successfully")
        navigate("../articles");
        // navigate("./author-profile/articles");
      }
    } catch (err) {
       toast.error(err.response?.data?.error || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={formCard}>
      <h2 className={formTitle}>Write New Article</h2>

      <form onSubmit={handleSubmit(submitArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Enter article title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
          />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select
            className={inputClass}
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Tags */}
        <div className={formGroup}>
          <label className={labelClass}>Tags</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Enter tags separated by commas"
            {...register("tags")}
          />
          <p className="text-xs text-[#6e6e73] mt-1">Example: react, design, web-development</p>
        </div>

        {/* Article Banner Image */}
        <div className={formGroup}>
          <label className={labelClass}>Article Banner Image</label>
          
          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            {BANNER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`group relative overflow-hidden rounded-xl border-2 transition h-14 ${
                  selectedImage === preset.url
                    ? "border-[#0066cc] ring-2 ring-[#0066cc]/10"
                    : "border-[#d2d2d7] hover:border-[#a1a1a6]"
                }`}
                onClick={() => setSelectedImage(preset.url)}
              >
                <img
                  src={preset.url}
                  alt={preset.label}
                  className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.7] transition"
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white text-center px-1">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>

          {/* Custom URL Input */}
          <input
            type="text"
            className={inputClass}
            placeholder="Or paste custom banner image URL..."
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
          />

          {/* Live Preview */}
          {selectedImage && (
            <div className="mt-3 bg-white border border-[#e8e8ed] rounded-xl p-3 flex gap-3 items-center max-w-md">
              <img
                src={selectedImage}
                alt="Banner Preview"
                className="w-20 h-14 object-cover rounded-lg border border-[#e8e8ed]"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&w=400&q=80";
                }}
              />
              <div>
                <p className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider">Live Preview</p>
                <p className="text-xs font-semibold text-[#1d1d1f] line-clamp-1 mt-0.5">Selected Banner Image</p>
                <p className="text-[10px] text-[#a1a1a6] mt-0.5 truncate max-w-50">{selectedImage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea
            rows="8"
            className={inputClass}
            placeholder="Write your article content..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Content must be at least 50 characters",
              },
            })}
          />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        {/* Submit */}
        <button className={submitBtn} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>

        {loading && <p className={loadingClass}>Publishing article...</p>}
      </form>
    </div>
  );
}

export default WriteArticles;