let books = []
let id = 1

const form = document.querySelector('form')
const table = document.querySelector('tbody')
const newTitle = document.querySelector('#title')
const newAuthor = document.querySelector('#author')
const newRead = document.querySelector('#read')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  newBook()
})

class Book {
  constructor (name, author, read) {
    this.id = id++
    this.name = name
    this.author = author
    this.read = read
  }
}

function BuildDelete (book) {
  const deleteCell = document.createElement('td')
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.className = 'btn btn-outline-danger'
  deleteButton.dataset.id = book.id
  deleteButton.addEventListener('click', (event) => deleteBook(parseInt(event.target.dataset.id)))
  deleteCell.appendChild(deleteButton)
  return deleteCell
}

function changeRead (checkbox) {
  const book = books.find(book => book.id === parseInt(checkbox.dataset.id))
  book.read = checkbox.checked
}

function deleteBook (id) {
  books = books.filter(book => book.id !== id)
  updateView()
}

function display (book) {
  const newRow = document.createElement('tr')
  newRow.appendChild(displayName(book))
  newRow.appendChild(displayAuthor(book))
  newRow.appendChild(displayRead(book))
  newRow.appendChild(BuildDelete(book))
  table.appendChild(newRow)
}

function displayAuthor (book) {
  const cell = document.createElement('td')
  cell.textContent = book.author
  return cell
}

function displayName (book) {
  const cell = document.createElement('td')
  cell.textContent = book.name
  return cell
}

function displayRead (book) {
  const cell = document.createElement('td')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = book.read
  checkbox.dataset.id = book.id
  checkbox.onchange = (event) => changeRead(event.target)
  cell.appendChild(checkbox)
  return cell
}

function newBook () {
  books.push(new Book(
    newTitle.value,
    newAuthor.value,
    newRead.checked
  ))
  form.reset()
  updateView()
}

function updateView () {
  table.innerHTML = ''
  books.forEach(book => {
    display(book)
  })
}