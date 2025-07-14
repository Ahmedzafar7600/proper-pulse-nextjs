'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
import bookMarkProperty from '@/app/actions/bookMarkProperty';
import { useSession } from 'next-auth/react';

function BookMarkButton({ property }) {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing');
      return;
    }

    try {
      const res = await bookMarkProperty(property._id);

      if (res?.isBookMarked) {
        toast.success('Property bookmarked');
      } else {
        toast.info('Bookmark removed');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Bookmark error:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
}

export default BookMarkButton;
