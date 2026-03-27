import { useState } from 'react';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';

function App() {
  // Categories that are selected from the checkboxes and are being used to filter the book list
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
      <BookList selectedCategories={selectedCategories}/>
    </>
  );
}

export default App;
