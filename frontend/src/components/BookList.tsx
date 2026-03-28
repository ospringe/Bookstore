import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // State variable to hold the list of books, initialized as an empty array.
  const [books, setBooks] = useState<Book[]>([]);

  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [sortOrder, setSortOrder] = useState<string>('asc');

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (book: Book) => {
    const newItem: CartItem = {
      bookID: book.bookID,
      title: book.title || 'No Book Found',
      price: book.price || 0,
      quantity: 1,
    };
    addToCart(newItem);
    navigate(`/cart`);
  };

  // Fetch books whenever page size, page number, or sorting changes
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${categoryParams ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();

      // Update the list of books returned from the API
      setBooks(data.books);

      // Store total number of books so we can calculate page count
      setTotalItems(data.totalNumBooks);

      // Calculate how many pages we need based on total books and page size
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <>
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                  <div>
                    <h1 className="display-6 fw-bold mb-1">Bookstore</h1>
                  </div>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      // Toggle between ascending and descending sort order
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      // Reset to page 1 when sorting changes
                      setPageNum(1);
                    }}
                  >
                    Sort by Title: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                  <div className="text-muted">
                    Total Books:{' '}
                    <span className="fw-semibold">{totalItems}</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <label
                      htmlFor="pageSize"
                      className="form-label mb-0 fw-semibold"
                    >
                      Results per page:
                    </label>
                    <select
                      id="pageSize"
                      className="form-select w-auto"
                      value={pageSize}
                      onChange={(p) => {
                        // Convert dropdown value to a number
                        setPageSize(Number(p.target.value));
                        // Reset to page 1 when page size changes
                        setPageNum(1);
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover align-middle small">
                    <thead className="table-dark">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Pages</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* map() loops through each book and creates a table row */}
                      {books.map((b) => (
                        <tr key={b.bookID}>
                          <td className="fw-semibold text-nowrap">{b.title}</td>
                          <td className="text-nowrap">{b.author}</td>
                          <td className="text-nowrap">{b.publisher}</td>
                          <td className="text-nowrap">{b.isbn}</td>
                          <td className="text-nowrap">{b.classification}</td>
                          <td className="text-nowrap">{b.category}</td>
                          <td className="text-nowrap">{b.pageCount}</td>
                          <td className="text-nowrap">${b.price.toFixed(2)}</td>
                          <td className="text-nowrap">
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => handleAddToCart(b)}
                            >
                              Add to Cart
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-4">
                  <button
                    className="btn btn-outline-secondary"
                    disabled={pageNum === 1}
                    onClick={() => setPageNum(pageNum - 1)}
                  >
                    Previous
                  </button>

                  {/* 
                    [...Array(totalPages)] creates an array the size of totalPages.
                    map() then creates a numbered button for each page.
                  */}
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      className={`btn ${
                        pageNum === i + 1
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                      key={i + 1}
                      onClick={() => setPageNum(i + 1)}
                      disabled={pageNum === i + 1}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-secondary"
                    disabled={pageNum === totalPages}
                    onClick={() => setPageNum(pageNum + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookList;
