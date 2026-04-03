import { useState } from 'react';
import type { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0.0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4 text-center">Add New Book</h2>

              <div className="row">
                {/* Title */}
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-4">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-2">
                <button type="submit" className="btn btn-success">
                  Add Book
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
      </div>
    </div>
  );
};

export default NewBookForm;
