import BookShelf from "./BookShelf";

const ListBooks = ({currentlyReading, wantToRead, read, onShelfChange }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf title='Currently Reading' shelfId='currentlyReading' books={currentlyReading} onShelfChange={onShelfChange} />
                <BookShelf title='Want to Read' shelfId='wantToRead' books={wantToRead} onShelfChange={onShelfChange} />
                <BookShelf title='Read' shelfId='read' books={read} onShelfChange={onShelfChange} />
            </div>
            
        </div>
    );
}

export default ListBooks;