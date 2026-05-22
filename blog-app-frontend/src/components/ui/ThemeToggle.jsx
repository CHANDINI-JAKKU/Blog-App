import React, {useEffect, useState} from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
    localStorage.setItem('theme', theme)
  },[theme])

  return (
    <button
      onClick={()=>setTheme(t=> t==='dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-white/10 text-white"
      aria-label="Toggle theme"
    >
      {theme==='dark' ? <Sun size={16}/> : <Moon size={16}/>}
    </button>
  )
}
