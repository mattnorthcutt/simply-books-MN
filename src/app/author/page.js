'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getEveryAuthor } from '@/api/authorData';
import AuthorCard from '../../components/AuthorCard';
import Search from '../../components/Search';

function AuthorPage() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getEveryAuthor(user.uid).then((fetchAuthors) => {
        setAuthors(fetchAuthors);
        setFilterAuthor(fetchAuthors);
      });
    }
  }, [user?.uid]);

  const getSearch = (term) => {
    const filter = authors.filter((author) => author.last_name.toLowerCase().includes(term.toLowerCase()));
    setFilterAuthor(filter);
  };

  return (
    <div className="text-center my-4">
      <Search type="authors" onSearch={getSearch} />

      <Link href="/author/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over authors here using AuthorCard component */}
        {filterAuthor.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getEveryAuthor} />
        ))}
      </div>
    </div>
  );
}

export default AuthorPage;
