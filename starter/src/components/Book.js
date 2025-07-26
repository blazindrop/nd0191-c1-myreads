const Book = ({ book, onShelfChange }) => {
    book.shelf = (book.shelf ? book.shelf : "none");
    const updateShelf = (newShelf) => {
        onShelfChange(book, newShelf);
    }
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks?.thumbnail}})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(e) => updateShelf(e.target.value)}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                {book.authors ? book.authors.join(', ') : 'Unknown Authors'}
            </div>
        </div>
    )
}

export default Book;