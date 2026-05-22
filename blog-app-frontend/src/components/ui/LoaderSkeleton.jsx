import React from "react";

export function LoaderSkeleton({count=4}){
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({length: count}).map((_,i)=> (
        <div key={i} className="animate-pulse space-y-4">
          <div className="h-44 w-full rounded-lg bg-slate-200" />
          <div className="h-4 w-3/4 rounded bg-slate-200" />
          <div className="h-3 w-full rounded bg-slate-200" />
          <div className="h-3 w-5/6 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  )
}

export default LoaderSkeleton;
