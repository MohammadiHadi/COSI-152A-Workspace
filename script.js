//     // let x = 'Hello, World!'
//     // console.log(x)
//     // console.log(typeof(x))

// const { all } = require("express/lib/application");

    
//     // // function greet(name) {
//     // //     return `Hello, ${name}!`;
//     // // }

//     // // const greet = (name) => {
//     // //     return `Hello, ${name}!`;
//     // // }

//     //     const greet = name => `Hello, ${name}!`;

//     // console.log(greet("Hadi"))
// const note = {
//   title: 'React Hooks Cheatsheet',
//   course: 'COSI 152A',
//   author: 'Alice Chen',
//   likes: 14,
//   tags: ['react', 'hooks', 'frontend']
// };

// // Arrow function: takes a note object, returns an HTML string
// const renderNoteCard = (note) => {
//   return `
//     <article class="note-card">
//       <h2>${note.title}</h2>
//       <span class="course-tag">${note.course}</span>
//       <p class="author">by ${note.author}</p>
//       <p class="likes">❤ ${note.likes}</p>
//     </article>
//   `;
// };

// console.log(renderNoteCard(note));



// let age = 17;
// if (age >= 18) {
//   console.log("You are an adult.");
// } else {
//   console.log("You are not an adult.");
// }

// const student = {
//   name: "Ali",
//   age: 20,
//   major: "Computer Science"
// };

// for (let key in student) {
//   console. log(key, student[key]);
// }

// const numbers = [10, 20, 30];

// for (let num of numbers) {
//   console.log(num);
// }


// // const note = { title: 'React Hooks', course: 'COSI 152A', likes: 14 };

// const { title, course, likes } = note;
// // title === 'React Hooks', course === 'COSI 152A'
// console.log(title)

// // With rename
// const { title: noteTitle } = note;  // noteTitle === 'React Hooks'


// const courses = ['COSI 152A', 'COSI 10A', 'COSI 131'];
// const [first, second] = courses;
// // first === 'COSI 152A'

// // Skip elements
// const [, , third] = courses;  // third === 'COSI 131'
// console.log(third)


// const frontendTags = ['react', 'css'];
// const backendTags  = ['node', 'express'];
// const allTags = [...frontendTags, ...backendTags];
// // ['react', 'css', 'node', 'express']
// console.log([...allTags, 'MongoDB'])

// const updatedNote = { ...note, likes: 15 };
// // { title: 'React Hooks', likes: 15 }  (original note unchanged)



// const notes = [
//   { id: 1, title: 'React Hooks',   course: 'COSI 152A', likes: 14 },
//   { id: 2, title: 'Express APIs',  course: 'COSI 152A', likes: 8  },
//   { id: 3, title: 'Binary Trees',  course: 'COSI 10A',  likes: 22 },
// ];

// const titles = notes.map(note => note.title);
// // ['React Hooks', 'Express APIs', 'Binary Trees']
// console.log(titles)

// const cs152Notes = notes.filter(note => note.course === 'COSI 152A');
// // [ {id:1,...}, {id:2,...} ]
// console.log(cs152Notes)


// const popular = notes.find(note => note.likes > 10);
// // { id: 1, title: 'React Hooks', ... }
// console.log(popular)



// const heading = `${note.title} — ${note.course}`;
// // 'React Hooks — COSI 152A'

// // Multi-line strings 
// const cardHTML = `
//   <article class="note-card">
//     <h2>${note.title}</h2>
//     <p>by ${note.author}</p>
//   </article>
// `;

// console.log(cardHTML)


// const searchInput = document.querySelector('#search');
// const firstCard   = document.querySelector('.note-card');
// const heading     = document.querySelector('header h1');
// // console.log(searchInput)
// // console.log(heading)

// const allCards = document.querySelectorAll('.note-card');
// // Convert to array for array methods:
// const cardsArray = Array.from(allCards);
// // or: [...allCards]
// // console.log(allCards)


// const grid = document.getElementById('note-grid');
// const tags = document.getElementsByClassName('course-tag');
// // console.log(grid)

// // Traversal
// const parent   = searchInput.parentElement;
// const children = searchInput.children;        // HTMLCollection
// const next     = searchInput.nextElementSibling;
// // console.log(parent)
// // console.log(next)



// const card = document.querySelector('header h1');

// // Reading and writing text content
// card.textContent = 'New title';         // plain text, no HTML
// card.innerHTML   = '<strong>Bold</strong>'; // parses HTML (use carefully)

// // // Reading and writing attributes
// card.setAttribute('data-id', '42');
// const id = card.getAttribute('data-id'); // '42'
// console.log(id)
// // // Class manipulation
// card.classList.add('highlighted');
// card.classList.remove('highlighted');

// // // Style 
// card.style.display = 'block';            // hide an element
// card.style.borderColor = '#003478';


// Creating and inserting new elements
// const newCard = document.createElement('article');
// newCard.className = 'note-card';
// newCard.innerHTML = `<h2>New Note</h2>`;
// const container = document.querySelector('.note-grid');
// container.appendChild(newCard);



// // Attaching an event listener
// const btn = document.querySelector('#like-btn');
// btn.addEventListener('click', (event) => {
//   alert('Button is cicked!')  
// });

// // The event object carries useful info
// btn.addEventListener('click', (e) => {
//   e.preventDefault();          // stop default browser action (e.g. form submit)
//   console.log(e.target);       // the element that was clicked
// });


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
















