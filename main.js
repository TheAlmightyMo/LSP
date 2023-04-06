// define a Book class
class Book {
  constructor(title, author, isbn, rackNumber) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.rackNumber = rackNumber;
    this.borrowed = false;
  }
  searchBooks(searchTerm) {
    const filteredBooks = this.books.filter((book) =>
      Object.values(book).some(
        (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
    );

    console.log(`All books with "${searchTerm}" in the title, author, ISBN or rack number:`);
    filteredBooks.forEach((book) => {
      console.log(`"${book.title}" by ${book.author}, ISBN: ${book.isbn}, Rack Number: ${book.rackNumber}`);
    });
    return filteredBooks;
  }
  searchBooksByAuthor(author) {
    const filteredBooks = this.books.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
    console.log(`All books by "${author}":`);
    filteredBooks.forEach((book) => {
      console.log(`"${book.title}" by ${book.author}, ISBN: ${book.isbn}, Rack Number: ${book.rackNumber}`);
    });
    return filteredBooks;
  }
  searchBooksByISBN(isbn) {
    const book = this.books.find((book) => book.isbn === isbn);
  
    if (!book) {
      console.log(`Book with ISBN "${isbn}" not found.`);
      return;
    }
  
    console.log(`Book with ISBN "${isbn}":`);
    console.log(`"${book.title}" by ${book.author}, ISBN: ${book.isbn}, Rack Number: ${book.rackNumber}`);
    return book;
}
createBook(title, author, isbn, rackNumber) {
  const newBook = new Book(title, author, isbn, rackNumber);
  this.books.push(newBook);
  console.log(`Book "${title}" created successfully.`);
}
listBooks() {
  console.log("All books in the library:");
  this.books.forEach((book) => {
    console.log(`"${book.title}" by ${book.author}, ISBN: ${book.isbn}, Rack Number: ${book.rackNumber}`);
  });
}
updateBook(isbn, updatedBook) {
  const book = this.books.find((book) => book.isbn === isbn);

  if (!book) {
    console.log(`Book with ISBN "${isbn}" not found.`);
    return;
  }

  Object.assign(book, updatedBook);
  console.log(`Book "${book.title}" updated successfully.`);
}

    // delete a book by ISBN
deleteBook(isbn) {
  const index = this.books.findIndex((book) => book.isbn === isbn);
  if (index === -1) {
    console.log(`Book with ISBN "${isbn}" not found.`);
    return;
  }
  this.books.splice(index, 1);
  console.log(`Book with ISBN "${isbn}" deleted successfully.`);
}
filterBooksByISBN(isbn) {
  const filteredBooks = this.books.filter((book) => book.isbn === isbn);
  console.log(`All books with ISBN ${isbn}:`);
  filteredBooks.forEach((book) => {
    console.log(`"${book.title}" by ${book.author}, ISBN: ${book.isbn}, Rack Number: ${book.rackNumber}`);
  });
  return filteredBooks;
}

filterBooksByRackNumber(rackNumber) {
  const filteredBooks = this.books.filter((book) => book.rackNumber === rackNumber);
  console.log(`All books on Rack Number ${rackNumber}:`);
  filteredBooks.forEach((book) => {
    console.log(`"${book.title}" by ${book.author}, ISBN: ${book.isbn}, Rack Number: ${book.rackNumber}`);
  });
  return filteredBooks;
}

}

// define a User class
class User {
  constructor(name, email, password, isLibrarian = false,isApproved = false) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.loggedIn = false;
    this.isLibrarian = isLibrarian;
    this.isApproved = isApproved;
  }

  login(email, password) {
    if(this.email === email && this.password === password && this.isLibrarian === true){  
      this.loggedIn = true;
      console.log(`Logged in as ${this.name}`);
    }
    else if(this.email === email && this.password === password && this.isLibrarian === false){  
      if(this.email === email && this.password === password && this.isApproved === true ){
        this.loggedIn = true;
        console.log(`Logged in as ${this.name}`);
      }
      else if(this.email === email && this.password === password && this.isApproved === false ) {
        console.log('You are not approved yet.');
      }
    }
    else {
      console.log('Invalid email or password');
    }
  }
  

  logout() {
    if (this.loggedIn === true) {
      this.loggedIn = false;
      console.log(`Logged out from ${this.name}`);
    } else {
      console.log('You are not logged in');
    }
  }
  
}

class Librarian extends User {
  constructor(name, email, password) {
    super(name, email, password);
  }
  }
  // define a NormalUser class
class NormalUser extends User {
  constructor(name, email, password) {
    super(name, email, password);
  }
}

// define a Library class that includes both NormalUser and Librarian users
class Library {
  constructor() {
    this.books = [];
    this.users = [];
  }

  // register a new user
  registerUser(user) {
    if (this.users.some((u) => u.email === user.email)) {
      console.log(`User with email "${user.email}" already exists.`);
      return;
    }

    this.users.push(user);
    console.log(`User "${user.name}" registered successfully.`);
  }

  // approve a user's account
  approveUser(email) {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      console.log(`User with email "${email}" not found.`);
      return;
    }

    if (user.approved) {
      console.log(`User "${user.name}" already approved.`);
      return;
    }

    user.approved = true;
    console.log(`User "${user.name}" approved successfully.`);
  }

  // reject a user's account
  rejectUser(email) {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      console.log(`User with email "${email}" not found.`);
      return;
    }

    if (!user.approved) {
      console.log(`User "${user.name}" already rejected.`);
      return;
    }

    user.approved = false;
    console.log(`User "${user.name}" rejected successfully.`);
  }

  // add a book to the library
  addBook(book) {
    this.books.push(book);
    console.log(`Book "${book.title}" added successfully.`);
  }
}

  /*test cases
1.Create some books and list them:
const librarian = new Librarian("John Doe", "john@example.com", "password");
librarian.createBook("1984", "George Orwell", "9780451524935", "A1");
librarian.createBook("Brave New World", "Aldous Huxley", "9780060850524", "A2");
librarian.createBook("Animal Farm", "George Orwell", "9780451526342", "A3");
librarian.listBooks();

2.Filter books by ISBN and rack number:
librarian.filterBooksByISBN("9780451524935");
librarian.filterBooksByRackNumber("A2");

3.Update a book:
librarian.updateBook("9780451524935", { title: "Nineteen Eighty-Four" });

4.Delete a book:
librarian.deleteBook("9780451526342");

5.Create some users and borrow some books:
const user1 = new User("Alice", "alice@example.com", "password");
const user2 = new User("Bob", "bob@example.com", "password");
user1.borrowBook(librarian.books[0]); // borrow the first book
user1.borrowBook(librarian.books[1]); // borrow the second book
user1.borrowBook(librarian.books[2]); // borrow the third book (should fail)
user1.showBorrowedBooks(); // show the borrowed books
user1.returnBook(librarian.books[0]); // return the first book
user1.showBorrowedBooks(); // show the borrowed books (should only show the second book now)
user2.borrowBook(librarian.books[0]); // try to borrow the first book (should fail)

6.Approve a user account:
const newApplicant = new User("Charlie", "charlie@example.com", "password");
librarian.approved = true;
newApplicant.borrowBook(librarian.books[0]); // should fail because the account is not approved yet
librarian.approved = false;
librarian.createBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", "B1");
librarian.approve = true;
newApplicant.approved = true;
newApplicant.borrowBook(librarian.books[3]); // should succeed


// Create a new librarian
const librarian = new Librarian("John Doe", "john@example.com", "password");

// Create some books
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-3-16-148410-0", 1);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "978-3-16-148410-1", 2);
const book3 = new Book("1984", "George Orwell", "978-3-16-148410-2", 3);

// Add the books to the librarian's collection
librarian.books.push(book1, book2, book3);

// List all books in the library
librarian.listBooks();

// Search for books by author
librarian.searchBooksByAuthor("Harper Lee");

// Search for a book by ISBN
librarian.searchBooksByISBN("978-3-16-148410-0");

// Create a new book
librarian.createBook("Animal Farm", "George Orwell", "978-3-16-148410-3", 4);

// Update a book
librarian.updateBook("978-3-16-148410-3", { rackNumber: 5 });

// Delete a book
librarian.deleteBook("978-3-16-148410-2");

// Approve a user
const user = new User("Jane Doe", "jane@example.com", "password");
librarian.approveUser(user);

// Reject a user
librarian.rejectUser(user);

// Borrow a book
user.approved = true;
user.borrowBook(book1);

// Return a book
user.returnBook(book1);

// Show borrowed books history
user.showBorrowedBooks();

// Manage borrowed requests
librarian.borrowRequests.push(book2);
librarian.borrowRequests.push(book3);
librarian.manageBorrowedRequests();

*/