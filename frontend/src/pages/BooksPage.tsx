import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import { useState } from 'react';

function BooksPage() {
  // Categories that are selected from the checkboxes and are being used to filter the book list
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  return (
    <>
      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <BookList selectedCategories={selectedCategories} />
    </>
  );
}

export default BooksPage;