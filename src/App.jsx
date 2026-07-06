
import { useEffect, useState } from 'react';

export default function App() {
  const [page, setPage] = useState('home');
  const [responses, setResponses] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('zoodeskResponses');
    if (saved) setResponses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('zoodeskResponses', JSON.stringify(responses));
  }, [responses]);

  const addResponse = () => {
    if (!title || !text) return;

    setResponses([
      {
        id: Date.now(),
        title,
        category,
        text,
        favorite: false
      },
      ...responses
    ]);

    setTitle('');
    setCategory('');
    setText('');
  };

  const deleteResponse = (id) => {
    setResponses(responses.filter(r => r.id !== id));
  };

  const copyResponse = (text) => {
    navigator.clipboard.writeText(text);
    alert('🐒 Response copied!');
  };

  const toggleFavorite = (id) => {
    setResponses(
      responses.map(r =>
        r.id === id ? { ...r, favorite: !r.favorite } : r
      )
    );
  };

  const filtered = responses.filter(r =>
    (r.title + r.category + r.text)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>🦁 ZooDesk Response Library</h1>
      <p>Your wild collection of IT ticket responses.</p>

      <button onClick={() => setPage('home')}>
        🐼 Animal Headquarters
      </button>
      <button onClick={() => setPage('motivation')}>
        🦜 Motivation Jungle
      </button>

      {page === 'home' && (
        <>
          <h2>🐾 Welcome to the Zoo Library</h2>
          <p>Add, search, copy, favorite and delete responses.</p>

          <input
            placeholder='🦒 Funny Response Name'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <br /><br />

          <input
            placeholder='Category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <br /><br />

          <textarea
            rows='6'
            placeholder='Ticket Response'
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <br /><br />

          <button onClick={addResponse}>
            🦥 Add Response
          </button>

          <hr />

          <input
            placeholder='🔎 Safari Search'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {filtered.map(response => (
            <div
              key={response.id}
              style={{
                border: '2px solid #ddd',
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                background: '#fff9db'
              }}
            >
              <h3>
                {response.favorite ? '⭐' : ''} {response.title}
              </h3>

              <p><strong>{response.category}</strong></p>
              <p>{response.text}</p>

              <button onClick={() => copyResponse(response.text)}>
                📋 Copy
              </button>

              <button onClick={() => toggleFavorite(response.id)}>
                ⭐ Favorite
              </button>

              <button onClick={() => deleteResponse(response.id)}>
                🗑 Delete
              </button>
            </div>
          ))}
        </>
      )}

      {page === 'motivation' && (
        <>
          <h2>🦁 Savannah's Motivation Jungle</h2>
          <h3>🌟 IT Hero Hall of Fame</h3>

          <ul>
            <li>✅ You survived printers.</li>
            <li>✅ Every ticket makes you stronger.</li>
            <li>✅ Users think you're magic.</li>
            <li>✅ You belong in IT.</li>
            <li>✅ Progress beats perfection.</li>
          </ul>

          <h2>🐘 Daily Encouragement</h2>
          <p>
            Today's mission: Fix issues, learn something new, and remember that even senior engineers Google things.
          </p>
        </>
      )}
    </div>
  );
}
