import Book from "./Book";

const BookShelf = ({title, books, onShelfChange}) => {
    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((b) => {
                            return (<li key={b.id}>
                                {<Book book={b} onShelfChange={onShelfChange} />}
                            </li>)
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default BookShelf;