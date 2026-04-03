import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
  // State to store books from API
  const [books, setBooks] = useState<Book[]>([]);
  
  // State for error message
  const [error, setError] = useState<string | null>(null);
  
  // State to track loading
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [pageSize, setPageSize] = useState<number>(5); // how many per page
  const [pageNum, setPageNum] = useState<number>(1); // current page
  const [totalPages, setTotalPages] = useState<number>(0); // total pages

  // Show/hide new book form
  const [showForm, setShowForm] = useState(false);
  
  // Store book being edited
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Runs when page loads or pageSize/pageNum changes
  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Call API to get books
        const data = await fetchBooks(pageSize, pageNum, 'asc', []);
        
        // Save books to state
        setBooks(data.books);
        
        // Calculate total pages
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        // Save error message
        setError((error as Error).message);
      } finally {
        // Stop loading
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum]);

  // Handles deleting a book
  const handleDelete = async (bookID: number) => {
    // Ask user to confirm delete
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;

    try {
      // Call API to delete book
      await deleteBook(bookID);
      
      // Remove book from state
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch (error) {
      // Show error if delete fails
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  // Show loading message
  if (loading) return <p className="text-center my-5">Loading books...</p>;
  
  // Show error message
  if (error)
    return <p className="text-center my-5 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Admin - Books</h1>

      {/* Show new book form if button clicked */}
      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false); // hide form after success
            
            // Reload books after adding new one
            fetchBooks(pageSize, pageNum, 'asc', []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)} // cancel form
        />
      )}

      {/* Show "Add Book" button when form is hidden */}
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add New Book
        </button>
      )}

      {/* Show edit form if a book is selected */}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null); // close edit form
            
            // Reload books after editing
            fetchBooks(pageSize, pageNum, 'asc', []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)} // cancel edit
        />
      )}

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              {/* Table headers */}
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through books and display each one */}
            {books.map((b) => (
              <tr key={b.bookID}>
                <td>{b.bookID}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>${b.price.toFixed(2)}</td>
                <td className="text-center">
                  {/* Edit button */}
                  <button
                    className="btn btn-sm btn-primary mb-1 w-100"
                    onClick={() => setEditingBook(b)}
                  >
                    Edit
                  </button>
                  
                  {/* Delete button */}
                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={() => handleDelete(b.bookID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum} // change page
          onPageSizeChange={(newSize) => {
            setPageSize(newSize); // change page size
            setPageNum(1); // reset to first page
          }}
        />
      </div>
    </div>
  );
};

export default AdminBooksPage;