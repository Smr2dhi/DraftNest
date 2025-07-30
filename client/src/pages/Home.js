// client/src/pages/Home.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/posts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then(res => setPosts(res.data))
      .catch(console.error)
  }, [token])

  const handleDelete = async id => {
    if (!window.confirm('Delete this post?')) return
    await axios.delete(`http://localhost:5001/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setPosts(p => p.filter(post => post._id !== id));
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'sans-serif',
        background: '#f8f9fa',
        minHeight: '100vh'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {token ? 'My Posts' : 'All Posts'}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {posts.map(p => (
          <div
            key={p._id}
            style={{
              background: '#fff',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {p.imagePath && (
              <img
                src={`http://localhost:5001/uploads/${p.imagePath}`}
                alt={p.title}
                style={{ width: '100%', height: 180, objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', color: '#343a40' }}>{p.title}</h3>
              <p style={{ color: '#555', flexGrow: 1 }}>
                {p.content.length > 100 ? p.content.slice(0, 100) + '…' : p.content}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Link
                  to={`/post/${p._id}`}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    backgroundColor: '#0d6efd',
                    color: '#fff',
                    fontWeight: 500
                  }}
                >
                  Read More
                </Link>
                {token && (
                  <>
                    <Link
                      to={`/edit/${p._id}`}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        backgroundColor: '#6c757d',
                        color: '#fff',
                        fontWeight: 500
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
