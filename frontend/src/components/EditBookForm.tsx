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
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Update Book</h2>

          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Author */}
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Publisher */}
          <div className="mb-3">
            <label className="form-label">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* ISBN */}
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Classification */}
          <div className="mb-3">
            <label className="form-label">Classification</label>
            <input
              type="text"
              name="classification"
              value={formData.classification}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Page Count */}
          <div className="mb-3">
            <label className="form-label">Page Count</label>
            <input
              type="number"
              name="pageCount"
              value={formData.pageCount}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Update Book
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;
