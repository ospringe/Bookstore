import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import { useState } from 'react';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container-fluid px-4">
      <CartSummary />

      <div className="row mt-4 align-items-start">
        <div className="col-md-4 col-lg-3 mb-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        <div className="col-md-8 col-lg-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;