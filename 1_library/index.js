const dummy = {
  title: "JS for dummies",
  author: "you",
  year: "2025",
  pages: "123",
  hasRead: false,
};
const cats = {
  title: "The big book about cats",
  author: "you",
  year: "2025",
  pages: "300",
  hasRead: true,
};

const myLibrary = [];

const submitBtn = document.getElementById("btn-submit");
const openDialogBtn = document.getElementById("btn-open-dialog");
const addBookDialog = document.getElementById("add-book-dialog");
const submitBookForm = document.getElementById("form-submit");
const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");

const libraryList = document.getElementById("library");

const openDialog = (dialog) => {
  dialog.showModal();
};

const closeDialog = (dialog) => {
  dialog.close();
};

function Book(title, author, year, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.hasRead = hasRead || false;
}

Book.prototype.setHasRead = function (hasRead) {
  this.hasRead = hasRead;
};

const removeBookFromList = (id) => {};

function addBookToLibrary(title, author, year, pages, hasRead) {
  const newBook = new Book(title, author, year, pages, hasRead);
  myLibrary.push(newBook);
  return newBook;
}

const addBook = (formData) => {
  const title = formData.get("title");
  const author = formData.get("author");
  const year = formData.get("year");
  const pages = formData.get("pages");
  const hasRead = formData.get("hasRead");
  const book = addBookToLibrary(title, author, year, pages, hasRead);
  return book;
};

const setBookReadStatus = (book, bool) => {
  book.setHasRead(bool);
};

const findBookInLibaryById = (id, library) =>
  library.find((book) => book.id === id);

const onCheckChanged = (e) => {
  const {
    target: { id, checked },
  } = e;

  const book = findBookInLibaryById(id, myLibrary);
  if (!book) {
    console.warn("book not found! disappeared??");
    return;
  }
  setBookReadStatus(book, checked);
  console.log(book.title, book.hasRead);
};

const addCheckBox = (id, bool) => {
  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = bool;
  check.id = `${id}`;
  check.addEventListener("change", onCheckChanged);
  return check;
};

const removeBookFromLibrary = (id, list) => {
  const bookToRemove = list.find((book) => book.id === id);
  if (!bookToRemove) return;
  const index = list.indexOf(bookToRemove);
  if (index < 0) return;
  list.splice(index, 1);
};

const deleteEntryElements = (id) => {
  const elementId = `entry-${id}`;
  const element = document.getElementById(elementId);
  const parent = element.parentElement;
  parent.removeChild(element);
};

const deleteBookById = (id) => {
  deleteEntryElements(id);
  removeBookFromLibrary(id, myLibrary);
};

const makeDeleteButton = (id) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  const deleteBook = () => deleteBookById(id);
  deleteBtn.addEventListener("click", deleteBook);

  return deleteBtn;
};

const makeBookEntryElements = (content) => {
  const { title, author, year, pages, hasRead, id } = content;

  const entry = document.createElement("div");
  const titleCell = document.createElement("div");

  const authorCell = document.createElement("div");
  const yearCell = document.createElement("div");
  const pagesCell = document.createElement("div");
  const hasReadCell = addCheckBox(id, hasRead);
  entry.id = `entry-${id}`;
  entry.classList = "entry";

  titleCell.textContent = title;
  authorCell.textContent = author;
  yearCell.textContent = year;
  pagesCell.textContent = pages;

  const deleteBtn = makeDeleteButton(id);

  [titleCell, authorCell, yearCell, pagesCell, hasReadCell, deleteBtn].forEach(
    (cell) => entry.appendChild(cell)
  );
  return entry;
};

const addBookToList = (book, list) => {
  const bookEntry = makeBookEntryElements(book);
  list.appendChild(bookEntry);
};

const submitBook = (e) => {
  e.preventDefault();
  const formData = new FormData(submitBookForm);
  const book = addBook(formData);
  addBookToList(book, libraryList);
  closeDialog(addBookDialog);
};

const initLibraryList = (library, list) => {
  library.forEach((book) => addBookToList(book, list));
};

submitBookForm.addEventListener("submit", submitBook);

const showAddBookDialog = () => openDialog(addBookDialog);
openDialogBtn.addEventListener("click", showAddBookDialog);

const addDummyData = (data) => {
  const { title, author, year, pages, hasRead } = data;
  const book = new Book(title, author, year, pages, hasRead);
  myLibrary.push(book);
};

[dummy, cats].forEach((data) => addDummyData(data));
initLibraryList(myLibrary, libraryList);
