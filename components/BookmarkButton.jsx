'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
// REMOVE THIS DIRECT IMPORT! It causes server-side code to be bundled on client.
// import bookMarkProperty from '@/app/actions/bookMarkProperty';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import checkBookMarkStatus from '@/app/actions/checkBookMarkStatus'; // Import the checkBookMarkStatus action

function BookMarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Assuming 'property' object contains initial bookmark status
  // You might need to fetch this from the server initially or pass it down
  const [isBookmarked, setIsBookmarked] = useState(property.isBookmarked || false);
  const [loading, setLoading] = useState(false);

  // You might want to update the initial state based on actual user bookmarks
  // This would typically involve fetching user data on the client or server
  // and passing down the correct initial 'isBookmarked' prop.
  // For simplicity, we'll assume 'property.isBookmarked' is reliable for now.

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!userId) {
        setLoading( false); // Reset loading state if no userId
        return false};
      try {
        const response = await checkBookMarkStatus(property._id);
        if(response.error) toast.error(response.error);
        else  setIsBookmarked(response.isBookMarked);
        setLoading(false); // Reset loading state after fetching

      } catch (error) {
        console.error('Error fetching bookmark status:', error);
        toast.error('Failed to fetch bookmark status');
      }
    };
 
    fetchBookmarkStatus();
  }, [property._id, userId,isBookmarked]);


  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing');
      return;
    }
 
    
    setLoading(true); // Indicate loading state
    
      // CORRECT WAY TO CALL A SERVER ACTION FROM A CLIENT COMPONENT:
      // Dynamically import the action and call its default export
      const bookMarkAction = (await import('@/app/actions/bookMarkProperty')).default;

      console.log('Bookmarking property:', property._id);

      // Now call the action with the property ID
      const res = await bookMarkAction(property._id).then((response) => {
        if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        setIsBookmarked(response.isBookMarked); // Update local state based on action's response
      }
      }).catch((error) => {
         toast.error('Something went wrong');
      console.error('Bookmark error:', error);
      }).finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  if(loading) {
    return (
      <button disabled className="bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
        <FaBookmark className="mr-2" />
        Processing...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      // Disable button while loading
      disabled={loading}
      className={`bg-${isBookmarked ? 'red' : 'blue'}-500 hover:bg-${isBookmarked ? 'red' : 'blue'}-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <FaBookmark className="mr-2" />
      {loading ? 'Processing...' : (isBookmarked ? 'Remove Bookmark' : 'Bookmark Property')}
    </button>
  );
}

export default BookMarkButton;