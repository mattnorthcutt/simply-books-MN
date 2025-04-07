'use client';

import React, { useEffect, useState } from 'react';
import { getPrivateBooks } from '@/api/bookData';
import { useAuth } from '@/utils/context/authContext';
import BookCard from '@/components/BookCard';
import Search from '@/components/Search';

function CommunityPage() {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);

  const { user } = useAuth();

  const getAllTheBooks = () => {
    getPrivateBooks(user.uid).then((fetchBooks) => {
      setBooks(fetchBooks);
      setFilterBooks(fetchBooks);
    });
  };

  const getSearch = (srch) => {
    const filter = books.filter((book) => book.title.toLowerCase().includes(srch.toLowerCase()));
    setFilterBooks(filter);
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <div className="text-center my-4">
      <Search type="books" onSearch={getSearch} />
      <div className="d-flex flex-wrap">
        {/* TODO: map over authors here using AuthorCard component */}
        {filterBooks.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
