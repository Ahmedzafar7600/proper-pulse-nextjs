import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import { getSessionUser } from '@/utils/getSessionUser';
import User from '@/models/User';


async function SavedPropertiesPage() {
   
    const {userId} =await getSessionUser();

   const {bookmarks}=await User.findById(userId).populate('bookmarks');
//    console.log('Bookmarks:', bookmarks);

    

    return (
        <div>
            <section className='px-4 py-6'>
                <div className='container lg:container mx-auto px-4 py-6'>
                    <h1 className='text-2xl font-bold mb-4'>Saved Properties</h1>
                     {bookmarks.length > 0 ? (
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'div>
                         {bookmarks.map((property) => (
                             <PropertyCard key={property._id} property={property} />
                         ))}
                     </div>
                      ) : (
                    <p className="text-gray-500">No saved properties found.</p>
                )}
                </div>
                 </section>
            
        </div>
    );
}

export default SavedPropertiesPage;
