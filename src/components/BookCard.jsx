import React from 'react'

export default function BookCard({ book }) {
  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="h-48 flex justify-center items-center mb-4">
        {coverUrl ? <img src={coverUrl} alt={book.title} className="h-full object-contain" /> : <div className="text-slate-400">No Cover</div>}
      </div>
      <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
      <p className="text-sm text-slate-600 mb-2">{book.authors.join(', ') || 'Unknown Author'}</p>
      <p className="text-xs text-slate-500 mb-4">{book.first_publish_year || 'Year unknown'}</p>
      <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noreferrer" className="mt-auto text-sm text-slate-800 hover:underline">View on Open Library</a>
    </div>
  )
}