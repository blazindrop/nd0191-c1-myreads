import "./App.css";
import { useState, useEffect } from "react";
import ListBooks from "./components/ListBooks";
import AddBook from "./components/AddBook";
import * as BooksAPI from "./BooksAPI";

function App() {
    const [showSearchPage, setShowSearchPage] = useState(false);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);
 
    const updateBookShelf = (book, shelf, newShelf) => {
        //console.log(`Called updateBookShelf for ID ${book.id} from shelf ${book.shelf} to shelf ${newShelf}`);
        if (book.shelf === newShelf) {
            return;
        }
        
        // Find the current shelf for the book and remove.
        switch (book.shelf) {
            case 'currentlyReading':
                //console.log(`Removing book from shelf ${currentShelf}`);
                setCurrentlyReading(currentlyReading.filter((b) => b.id !== book.id));
                break;
            case 'read':
                //console.log(`Removing book from shelf ${currentShelf}`);
                setRead(read.filter((b) => b.id !== book.id));
                break;
            case 'wantToRead':
                //console.log(`Removing book from shelf ${currentShelf}`);
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
                //bookMappings[b.shelf] = bookMappings[b.shelf];
                // Remove shelf - it's no longer static here on out since we use 
                // React state to manage.
                //const copy = {...b};
                //delete(copy.shelf);
                //bookMappings[b.shelf].push(copy);
                bookMappings[b.shelf].push(b);
            })
            setCurrentlyReading(bookMappings['currentlyReading']);
            setWantToRead(bookMappings['wantToRead']);
            setRead(bookMappings['read']);
        }
        console.log('Calling getBooks() in useEffect');
        getBooks();
    }, []);

    useEffect(() => {
        console.log('currentlyReading updated:');
        console.log(currentlyReading);
    }, [currentlyReading])

  const updateShowSearchPage = () => {
    setShowSearchPage(!showSearchPage);
  }

  return (
    <div className="app">
      {showSearchPage ? (
          <AddBook 
            onSetShowSearchPage={updateShowSearchPage}
            onShelfChange={updateBookShelf}/>
          ) : (
          <>
            <ListBooks
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              onShelfChange={updateBookShelf}
              />
            <div className="open-search">
              <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
            </div>
          </>
        )
      }  
    </div>
  );
}

export default App;
