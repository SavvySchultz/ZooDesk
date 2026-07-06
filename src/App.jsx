
!-- index.html -->
<div id="app" style="padding:20px;">
  <h1>🦁 ZooDesk Response Library</h1>
  <p>Your wild collection of IT ticket responses.</p>
  <button onclick="showPage('home')">🐼 Animal Headquarters</button>
  <button onclick="showPage('motivation')">🦜 Motivation Jungle</button>
  <div id="homePage">
    <h2>🐾 Welcome to the Zoo Library</h2>
    <p>Add, search, copy, favorite and delete responses.</p>
    <input id="title" placeholder="🦒 Funny Response Name">
    <br><br>
    <input id="category" placeholder="Category">
    <br><br>
    <textarea id="responseText" rows="6" placeholder="Ticket Response"></textarea>
    <br><br>
    <button onclick="addResponse()">🦥 Add Response</button>
    <hr>
    <input id="search" placeholder="🔎 Safari Search" oninput="renderResponses()">
    <div id="responseList"></div>
  </div>
  <div id="motivationPage" style="display:none;">
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
    <p>Today's mission: Fix issues, learn something new, and remember that even senior engineers Google things.</p>
  </div>
</div>
<!-- styles.css -->
<style>
.response-card{
  border:2px solid #ddd;
  margin-top:10px;
  padding:10px;
  border-radius:10px;
  background:#fff9db;
}
</style>
<!-- script.js -->
<script>
let responses = JSON.parse(localStorage.getItem('zoodeskResponses')) || [];
function saveResponses(){
  localStorage.setItem('zoodeskResponses', JSON.stringify(responses));
}
function showPage(page){
  document.getElementById('homePage').style.display = page === 'home' ? 'block' : 'none';
  document.getElementById('motivationPage').style.display = page === 'motivation' ? 'block' : 'none';
}
function addResponse(){
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const text = document.getElementById('responseText').value;
  if(!title || !text) return;
  responses.unshift({
    id: Date.now(),
    title,
    category,
    text,
    favorite:false
  });
  saveResponses();
  renderResponses();
  document.getElementById('title').value='';
  document.getElementById('category').value='';
  document.getElementById('responseText').value='';
}
function deleteResponse(id){
  responses = responses.filter(r => r.id !== id);
  saveResponses();
  renderResponses();
}
function copyResponse(text){
  navigator.clipboard.writeText(text);
  alert('🐒 Response copied!');
}
function toggleFavorite(id){
  responses = responses.map(r => r.id === id ? {...r,favorite:!r.favorite} : r);
  saveResponses();
  renderResponses();
}
function renderResponses(){
  const search = document.getElementById('search').value.toLowerCase();
  const list = document.getElementById('responseList');
  const filtered = responses.filter(r =>
    (r.title + r.category + r.text).toLowerCase().includes(search)
  );
  list.innerHTML = filtered.map(r => `
    <div class="response-card">
      <h3>${r.favorite ? '⭐' : ''} ${r.title}</h3>
      <p><strong>${r.category}</strong></p>
      <p>${r.text}</p>
      <button onclick="copyResponse(${JSON.stringify('${r.text}')})">📋 Copy</button>
      <button onclick="toggleFavorite(${r.id})">⭐ Favorite</button>
      <button onclick="deleteResponse(${r.id})">🗑 Delete</button>
    </div>
  `).join('');
}

renderResponses();
</script>
