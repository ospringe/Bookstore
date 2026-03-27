import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  // Categories for the filter that are being set from the API call
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Book/GetBookCategories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // If the category is already selected, remove it; otherwise, add it to the list
    const updatedCategory = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategory);
  }

  return (
    <div className="card shadow-sm p-3 category-card">
      <h5 className="card-title mb-3">Book Categories</h5>

      <div className="list-group category-list">
        {categories.map((c) => (
          <label
            key={c}
            htmlFor={c}
            className="list-group-item category-item d-flex align-items-center"
          >
            <input
              className="form-check-input category-checkbox me-3"
              type="checkbox"
              id={c}
              value={c}
              onChange={handleCheckboxChange}
            />
            <span className="form-check-label category-label">{c}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
