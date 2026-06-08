import './style.css'

const notes = [
  { id: 1, title: 'React Hooks Cheatsheet', course: 'COSI 152A',
    author: 'Alice Chen', likes: 14 },
  { id: 2, title: 'Express REST APIs',      course: 'COSI 152A',
    author: 'Bob Lee',   likes: 8  },
  { id: 3, title: 'Binary Trees',           course: 'COSI 10A',
    author: 'Carol Wu',  likes: 22 },
];

const renderNoteCard = ({ id, title, course, author, likes }) => `
  <article class="note-card" data-id="${id}">
    <h2>${title}</h2>
    <span class="course-tag">${course}</span>
    <p class="author">by ${author}</p>
    <button aria-label='Like this note' class="like-btn">❤ <span class="like-count">${likes}</span></button>
  </article>
`;

const grid = document.querySelector('.note-grid');
const searchStatus = document.querySelector('#search-status');


// Helper: render an array of notes into the grid
const renderNotes = (notesToShow) => {
  grid.innerHTML = notesToShow.map(renderNoteCard).join('');
  searchStatus.textContent = `${notesToShow.length} note${notesToShow.length === 1 ? '' : 's'} found.`;

};

// Initial render
renderNotes(notes);

// Live search — re-render filtered subset on every keystroke
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.course.toLowerCase().includes(query)
  );

  renderNotes(filtered);
});


// src/main.js
const postBtn    = document.getElementById('show-post-form')
const formSec    = document.getElementById('post-form-section')
const notesSec   = document.getElementById('notes-section')

postBtn.addEventListener('click', () => {
  const open = formSec.style.display !== 'none'
  formSec.style.display  = open ? 'none'  : 'block'
  notesSec.style.display = open ? 'block' : 'none'
  postBtn.textContent    = open ? 'Post a Note' : 'Back to Notes'
})

document.getElementById('post-note-form')
  .addEventListener('submit', e => {
    e.preventDefault()
  })
