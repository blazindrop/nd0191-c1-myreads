import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

const AddBook = ({ onSetShowSearchPage, onShelfChange }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const updateQuery = (query) => {
        console.log(`updating query to ${query}`);
        setQuery(query);
    }

    useEffect(() => {
        if (query) {
            console.log('useEffect[query] called');
            const update = async () => {
                const results = await BooksAPI.search(query);
                console.log(results);
                if (results.length === 0) {
                    setResults([]);
                }
                else {
                    setResults(results);
                }
            }
            update();
        }
    }, [query]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a className="close-search" onClick={() => onSetShowSearchPage()}>Close</a>
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
                    {results.length > 0 && (results.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onShelfChange={onShelfChange} />
                        </li>
                    )))}
                </ol>
            </div>
        </div>
    )
}

export default AddBook;