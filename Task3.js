// 1st
// let books = [];

// function displayBooks(booksToShow) {
//     const bookList = document.getElementById("bookList");
//     bookList.innerHTML = '';

//     booksToShow.forEach(book => {
//         const bookElement = document.createElement('div');
//         bookElement.classList.add('bookItem');
//         bookElement.textContent = `${book.bookName} by ${book.authorName}, published on ${book.publishDate}`;
//         bookList.appendChild(bookElement);
//     });
// }

// displayBooks(books);

// document.getElementById('Search').addEventListener('input', function() {
//     const searchTerm = this.value.toLowerCase();
//     const filteredBooks = books.filter(book => 
//         book.bookName.toLowerCase().includes(searchTerm) || 
//         book.authorName.toLowerCase().includes(searchTerm) ||
//         book.publishDate.includes(searchTerm)
//     );

//     displayBooks(filteredBooks);
// });

// document.getElementById('addBooksButton').addEventListener('click', function() {
//     const bookName = document.getElementById('bookName').value;
//     const authorName = document.getElementById('authorName').value;
//     const publishDate = document.getElementById('publishDate').value;
//     if (bookName && authorName && publishDate) {
//         books.push({ bookName, authorName, publishDate });
//         displayBooks(books);

//         document.getElementById('bookName').value = '';
//         document.getElementById('authorName').value = '';
//         document.getElementById('publishDate').value = '';
//     } else {
//         alert('Please fill in all fields.');
//     }
// });



// // funtion = A JavaScript function is a block of code designed to perform a particular task.
// // funtion call = With the call() method, you can write a method that can be used on different objects.
// // .getElementById = Get the element with the specified id
// // .createElement = The createElement() method creates an element node
// // .add = The add() method is used to add an option to a drop-down list.
// // .appendChild = The appendChild() method appends a node (element) as the last child of an element.
// // .addEventListener = The addEventListener() method attaches an event handler to the specified element.
// // .toLowerCase() = The toLowerCase() method converts a string to lowercase letters.
// // .include() = The includes() method returns true if a string contains a specified string.
// // .filter( => ) = The filter() method creates a new array filled with elements that pass a test provided by a function.
// // .push = The push() method adds new items to the end of an array.
// // alert = The alert() method displays an alert box with a message and an OK button.




// 2nd
// let books = [];

// function displayBooks(booksToShow) {
//     const bookList = document.getElementById("bookList");
//     bookList.innerHTML = '';

//     booksToShow.forEach((book, index) => {
//         const bookElement = document.createElement('div');
//         bookElement.classList.add('bookItem');

//         // Book details text
//         const bookDetails = document.createElement('span');
//         bookDetails.textContent = `${book.bookName} by ${book.authorName}, published on ${book.publishDate}`;
//         bookElement.appendChild(bookDetails);

//         // Edit button
//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.classList.add('editButton');
//         editButton.addEventListener('click', () => {
//             editBook(index);
//         });
//         bookElement.appendChild(editButton);

//         bookList.appendChild(bookElement);
//     });
// }

// function editBook(index) {
//     const book = books[index];
//     const newBookName = prompt('Enter new book name:', book.bookName);
//     const newAuthorName = prompt('Enter new author name:', book.authorName);
//     const newPublishDate = prompt('Enter new publish date:', book.publishDate);

//     if (newBookName && newAuthorName && newPublishDate) {
//         books[index] = {
//             bookName: newBookName,
//             authorName: newAuthorName,
//             publishDate: newPublishDate
//         };
//         displayBooks(books);
//     } else {
//         alert('Please fill in all fields.');
//     }
// }

// displayBooks(books);

// document.getElementById('Search').addEventListener('input', function() {
//     const searchTerm = this.value.toLowerCase();
//     const filteredBooks = books.filter(book => 
//         book.bookName.toLowerCase().includes(searchTerm) || 
//         book.authorName.toLowerCase().includes(searchTerm) ||
//         book.publishDate.includes(searchTerm)
//     );

//     displayBooks(filteredBooks);
// });

// document.getElementById('addBooksButton').addEventListener('click', function() {
//     const bookName = document.getElementById('bookName').value;
//     const authorName = document.getElementById('authorName').value;
//     const publishDate = document.getElementById('publishDate').value;
//     if (bookName && authorName && publishDate) {
//         books.push({ bookName, authorName, publishDate });
//         displayBooks(books);

//         document.getElementById('bookName').value = '';
//         document.getElementById('authorName').value = '';
//         document.getElementById('publishDate').value = '';
//     } else {
//         alert('Please fill in all fields.');
//     }
// });




// 3rd
let books = [];
let currentIndex = -1;
let deleteIndex = -1;

function displayBooks(booksToShow) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = '';

    booksToShow.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('bookItem');
        bookElement.innerHTML = `
            ${book.bookName} by ${book.authorName}, published on ${book.publishDate}
            <button class="editButton" onclick="editBook(${index})">Edit</button>
            <button class="deleteButton" onclick="confirmDeleteBook(${index})" ${currentIndex !== -1 ? 'disabled' : ''}>Delete</button>
        `;
        bookList.appendChild(bookElement);
    });
}

function showAddBookForm() {
    document.getElementById('AddBook').style.display = 'Block';
    document.getElementById('addBooksButton').textContent = 'Add Book';
    document.getElementById('addBookToListButton').disabled = false;
    currentIndex = -1; // Reset currentIndex
    enableAllDeleteButtons();
}

function editBook(index) {
    currentIndex = index;
    const book = books[index];
    document.getElementById('bookName').value = book.bookName;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('publishDate').value = book.publishDate;
    document.getElementById('AddBook').style.display = 'block';
    document.getElementById('addBooksButton').textContent = 'Update Change';
    document.getElementById('addBookToListButton').disabled = true;
    disableAllDeleteButtons();
}

function confirmDeleteBook(index) {
    deleteIndex = index;
    showModal('confirmDeleteModal');
}

function confirmDelete() {
    if (deleteIndex > -1) {
        books.splice(deleteIndex, 1);
        displayBooks(books);
        closeModal('confirmDeleteModal');
        deleteIndex = -1;
    }
}

function disableAllDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(button => button.disabled = true);
}

function enableAllDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(button => button.disabled = false);
}

document.getElementById('addBooksButton').addEventListener('click', function() {
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const publishDate = document.getElementById('publishDate').value;
    
    let isValid = true;
    document.getElementById('bookNameError').textContent = '';
    document.getElementById('authorNameError').textContent = '';
    document.getElementById('publishDateError').textContent = '';

    if (!bookName) {
        document.getElementById('bookNameError').textContent = '*Please fill Book Name';
        isValid = false;
    }
    if (!authorName) {
        document.getElementById('authorNameError').textContent = '*Please fill Author Name';
        isValid = false;
    }
    if (!publishDate) {
        document.getElementById('publishDateError').textContent = '*Please fill Published Date';
        isValid = false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (publishDate > today) {
        document.getElementById('publishDateError').textContent = '*Published Date cannot be in the future';
        isValid = false;
    }

    if (isValid) {
        if (currentIndex === -1) {
            // Add new book
            books.push({ bookName, authorName, publishDate });
            displayBooks(books);
            document.getElementById('bookName').value = '';
            document.getElementById('authorName').value = '';
            document.getElementById('publishDate').value = '';
            document.getElementById('AddBook').style.display = 'none';
        } else {
            showModal('confirmEditModal');
        }
    }
});

document.getElementById('Search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.bookName.toLowerCase().includes(searchTerm) || 
        book.authorName.toLowerCase().includes(searchTerm) ||
        book.publishDate.includes(searchTerm)
    );

    displayBooks(filteredBooks);
});

function confirmEdit() {
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const publishDate = document.getElementById('publishDate').value;

    books[currentIndex] = { bookName, authorName, publishDate };
    displayBooks(books);
    closeModal('confirmEditModal');

    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('publishDate').value = '';
    document.getElementById('AddBook').style.display = 'none';
    document.getElementById('addBookToListButton').disabled = false;
    enableAllDeleteButtons();
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

displayBooks(books);

