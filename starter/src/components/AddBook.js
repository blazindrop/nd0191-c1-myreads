import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

const AddBook = ({ currentBooksOnShelves, onSetShowSearchPage, onShelfChange }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const updateQuery = (query) => {
        setQuery(query);
    }

    useEffect(() => {
        if (query) {
            const update = async () => {
                const results = await BooksAPI.search(query);
                if (!results.length || results.length === 0) {
                    setResults([]);
                }
                else {
                    const newResults = results.map((r) => {
                        const foundBookOnShelf = currentBooksOnShelves.find((b) => b.id === r.id);
                        if (foundBookOnShelf) {
                            r.shelf = foundBookOnShelf.shelf;
                        }
                        return r;
                    });
                    setResults(newResults);
                }
            }
            update();
        }
    }, [query, currentBooksOnShelves]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search" onClick={() => onSetShowSearchPage()}>Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => updateQuery(e.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {results.length > 0 && results.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onShelfChange={onShelfChange} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default AddBook;