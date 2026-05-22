import React from "react";

function SearchBar({searchText, setSearchText, selectedCategory, setSelectedCategory, tagFilter, setTagFilter, categories, onSearch}){
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
      <div className="relative">
        <input
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
          onKeyDown={(e)=>{if(e.key==='Enter'){onSearch()}}}
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Search articles, authors, tags..."
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}
        className="rounded-full border border-slate-200 bg-white px-4 py-3 text-slate-800"
      >
        {categories.map(c=> <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <div className="flex gap-2">
        <input
          value={tagFilter}
          onChange={(e)=>setTagFilter(e.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400"
          placeholder="Tag"
        />
        <button onClick={onSearch} className="rounded-full bg-sky-600 px-5 py-3 text-white font-semibold">Search</button>
      </div>
    </div>
  )
}

export default SearchBar;
