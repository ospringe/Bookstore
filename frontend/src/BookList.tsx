// This component fetches a list of books and then displays them.

import { useEffect, useState } from "react";
import type { Book } from "./types/Book";
function BookList() {

    // State variable to hold the list of books, initialized as an empty array.
    const [books, setBooks] = useState<Book[]>([]);

    // Fetch the list of books from the API when the component mounts and update the state with the retrieved data.
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch ('https://localhost:5000/api/Book/AllBooks'); // !!!!!!!!
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();

    }, []);

    return (
        // Display the data from the database
        <>
        <section>

            <h1>Bookstore</h1>

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
                            <tr>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.publisher}</td>
                                <td>{b.isbn}</td>
                                <td>{b.classification}</td>
                                <td>{b.category}</td>
                                <td>{b.pageCount}</td>
                                <td>{b.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>

        <br />

        <label>
            Results per page:
            <select>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </label>
        </>
    );
}

export default BookList;