// This component fetches a list of books and then displays them.

import { useEffect, useState } from 'react';
import type { Book } from './types/Book';
function BookList() {
  // State variable to hold the list of books, initialized as an empty array.
  const [books, setBooks] = useState<Book[]>([]);

  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [sortOrder, setSortOrder] = useState<string>('asc');

  // Fetch the list of books from the API when the component mounts and update the state with the retrieved data.
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder]);

  return (
    // Display the data from the database
    <>
      <section>
        <h1>Bookstore</h1>

        <button
          onClick={() => {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setPageNum(1);
          }}
        >
          Sort by Title: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>

        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Category</th>
                <th>Number of Pages</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.bookID}>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.publisher}</td>
                  <td>{b.isbn}</td>
                  <td>{b.classification}</td>
                  <td>{b.category}</td>
                  <td>{b.pageCount}</td>
                  <td>${b.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>

        <br />

        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </section>
    </>
  );
}

export default BookList;
