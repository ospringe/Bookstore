import type { Book } from '../types/Book';

// This defines what the API response will look like
interface FetchBooksResponse {
  books: Book[]; // list of books
  totalNumBooks: number; // total number of books in database
}

// Base URL for API
const API_URL = 'https://bookstore-springer-backend-hthvcxgxgwcmhxhb.francecentral-01.azurewebsites.net/api/Book';

// Function to GET books from API
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    // Convert categories into query string (category=...&category=...)
    const categoryParams = selectedCategories
      .map((cat) => `category=${encodeURIComponent(cat)}`)
      .join('&');

    // Call API with query parameters
    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${categoryParams ? `&${categoryParams}` : ''}`
    );

    // If request fails, throw error
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    // Return JSON data from API
    return await response.json();
  } catch (error) {
    // Log error and rethrow it
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Function to POST (add) a new book
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    // Send new book to API
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // sending JSON
      },
      body: JSON.stringify(newBook), // convert object to JSON
    });

    // If request fails, throw error
    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    // Return the created book
    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// Function to PUT (update) an existing book
export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    // Send updated book data to API
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    // Return updated book from API
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Function to DELETE a book
export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    // Call API to delete book
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    // If request fails, throw error
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};