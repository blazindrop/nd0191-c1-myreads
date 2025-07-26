import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import AddBook from "./components/AddBook";
import * as BooksAPI from "./BooksAPI";


function App() {
    const [showSearchPage, setShowSearchPage] = useState(false);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);
 
    const updateBookShelf = (book, newShelf) => {
        if (book.shelf === newShelf) {
            return;
        }
        
        // Find the current shelf for the book and remove.
        switch (book.shelf) {
            case 'currentlyReading':
                setCurrentlyReading(currentlyReading.filter((b) => b.id !== book.id));
                break;
            case 'read':
                setRead(read.filter((b) => b.id !== book.id));
                break;
            case 'wantToRead':
                setWantToRead(wantToRead.filter((b) => b.id !== book.id));
                break;
            case 'none':
                // Book from the search page probably. NOOP.
                break;
            default:
                // No current shelf - NOOP.
                break;
        }

        // Next, add the book to the new shelf.
        switch (newShelf) {
            case 'currentlyReading':
                BooksAPI.update(book, newShelf);
                book.shelf = newShelf;
                setCurrentlyReading([...currentlyReading, book]);
                break;
            case 'read':
                BooksAPI.update(book, newShelf);
                book.shelf = newShelf;
                setRead([...read, book]);
                break;
            case 'wantToRead':
                BooksAPI.update(book, newShelf);
                book.shelf = newShelf;
                setWantToRead([...wantToRead, book]);
                break;
            default:
                // No current shelf - NO OP.
                break;
        }
    };

    useEffect(() => {
        const bookMappings = {
            currentlyReading: [],
            wantToRead: [],
            read: []
        };
        const getBooks = async () => {
            const allBooks = await BooksAPI.getAll();
            allBooks.forEach((b) => {
                bookMappings[b.shelf].push(b);
            })
            setCurrentlyReading(bookMappings['currentlyReading']);
            setWantToRead(bookMappings['wantToRead']);
            setRead(bookMappings['read']);
        }
        getBooks();
    }, []);

  const updateShowSearchPage = () => {
    setShowSearchPage(!showSearchPage);
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <>
            <ListBooks
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                onShelfChange={updateBookShelf}
            />
            <div className="open-search">
              <Link to="/create" onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</Link>
            </div>
          </>
        }>
        </Route>
        <Route exact path="/create" element={
          <AddBook
              currentBooksOnShelves={[...currentlyReading, ...wantToRead, ...read]}
              onSetShowSearchPage={updateShowSearchPage}
              onShelfChange={updateBookShelf} />
        }>
        </Route>
    </Routes>
  </div>
  );
}

export default App;
