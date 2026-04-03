import { useState } from 'react';
import type { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

// Props this component expects
interface EditBookFormProps {
  book: Book; // book to edit
  onSuccess: () => void; // runs after successful update
  onCancel: () => void; // runs if user cancels
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  // Store form data (start with existing book values)
  const [formData, setFormData] = useState<Book>({ ...book });

  // Runs whenever an input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update only the field that changed
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Runs when form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop page refresh

    // Send updated book to API
    await updateBook(formData.bookID, formData);

    // Tell parent we are done
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>

      {/* Input for title */}
      <label>
        Title:
        <input
          type="text"
          name="title" // must match property name
          value={formData.title}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for author */}
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for publisher */}
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for ISBN */}
      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for classification */}
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for category */}
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for page count */}
      <label>
        Page Count:
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        ></input>
      </label>

      {/* Input for price */}
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        ></input>
      </label>

      {/* Submit button */}
      <button type="submit">Update Book</button>

      {/* Cancel button */}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
