import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'

export default function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  async function doSearch(title) {
    const trimmed = title.trim()
    if (!trimmed) return
    setLoading(true)
    setError(null)
    setBooks([])

    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(trimmed)}&limit=40`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      const mapped = (data.docs || []).map((d) => ({
        key: d.key,
        title: d.title,
        authors: d.author_name || [],
        first_publish_year: d.first_publish_year,
        cover_i: d.cover_i,
      }))
      setBooks(mapped)
    } catch (err) {
      setError('Failed to fetch results. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-2">📚 Book Finder Alex</h1>
        <p className="text-slate-600 mb-4">Search books by title using Open Library API.</p>
        <SearchBar value={query} onChange={setQuery} onSearch={() => doSearch(query)} />
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && books.length === 0 && (
          <p className="text-center text-slate-500">Search for a book title to begin.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {books.map((b) => (
            <BookCard key={b.key} book={b} />
          ))}
        </div>
      </main>
    </div>
  )
}