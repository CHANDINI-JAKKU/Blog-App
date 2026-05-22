import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { axiosInstance as axios } from "../axiosConfig";


import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  articlePageWrapper,
} from "../styles/common";

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

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const article = location.state;
  const [selectedImage, setSelectedImage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!article) return;

     setValue("title", article.title);
     setValue("category", article.category);
     setValue("tags", (article.tags || []).join(", "));
     setValue("content", article.content);
     setSelectedImage(article.courseImage || "");
  }, [article]);

  const category = watch("category");

  useEffect(() => {
    if (category && article) {
      // only auto-update if the current selectedImage is empty or matches one of the presets
      const isCurrentPreset = BANNER_PRESETS.some((preset) => preset.url === selectedImage) || !selectedImage;
      if (isCurrentPreset) {
        const match = BANNER_PRESETS.find((preset) => preset.id === category);
        if (match) {
          setSelectedImage(match.url);
        }
      }
    }
  }, [category, article]);

  const updateArticle = async (modifiedArticle) => {
    modifiedArticle.articleId = article._id;
    modifiedArticle.courseImage = selectedImage;
    if (modifiedArticle.tags && typeof modifiedArticle.tags === "string") {
      modifiedArticle.tags = modifiedArticle.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    const res = await axios.put("/author-api/articles", modifiedArticle);
    if (res.status === 200) {
      navigate(`/article/${article._id}`, { state: res.data.payload });
    }
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input className={inputClass} {...register("title", { required: "Title required" })} />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select className={inputClass} {...register("category", { required: "Category required" })}>
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
          {errors.tags && <p className={errorClass}>{errors.tags.message}</p>}
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

          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button className={submitBtn}>Update Article</button>
      </form>
    </div>
  );
}

export default EditArticle;