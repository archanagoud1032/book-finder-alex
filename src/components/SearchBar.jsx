import React from 'react'

export default function SearchBar({ value, onChange, onSearch }) {
  const handleKey = (e) => e.key === 'Enter' && onSearch()
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-slate-400"
        placeholder="Search by book title..."
      />
      <button
        onClick={onSearch}
        className="px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
      >Search</button>
    </div>
  )
}