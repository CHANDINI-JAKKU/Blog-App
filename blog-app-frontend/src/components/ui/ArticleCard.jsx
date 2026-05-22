import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Eye } from "lucide-react";

const statClass = "flex items-center gap-2 text-sm text-slate-500";

function ArticleCard({ article, onOpen }) {
  const readingTime = Math.max(2, Math.ceil((article.content || "").split(" ").length / 200));

  return (
    <motion.button
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-transform duration-300 text-left"
      onClick={() => onOpen(article)}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={article.articleImage || article.courseImage || ''}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-700 shadow-sm">
          {article.category}
        </span>
        {article.isTrending && (
          <span className="absolute right-4 top-4 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold text-amber-900">Trending</span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-3">{article.content}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={statClass}><Eye size={16} /> {article.views ?? 0}</div>
            <div className={statClass}><Heart size={16} /> {article.likes ?? 0}</div>
            <div className={statClass}><MessageCircle size={16} /> {article.comments?.length ?? 0}</div>
          </div>
          <div className="text-xs text-slate-400">{readingTime} min read</div>
        </div>
      </div>
    </motion.button>
  );
}

export default ArticleCard;
