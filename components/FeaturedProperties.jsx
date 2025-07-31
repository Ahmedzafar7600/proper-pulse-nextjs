import React from 'react';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import FeaturedPropertyCard from './FeaturedPropertyCard';

async function FeaturedProperties() {
    await connectDB();
    const properties = await Property.find({ featured: true })
        // .limit(6)
        .lean();
  return (
    <div>
      <section  className='bg-blue-50 px-4 pt-6 pb-10 py-2'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-2xl font-bold mb-4 text-center text-blue-500'>Featured Properties</h2>
                <div className='grid .grid-cols-1 md:grid-cols-2 gap-6'>
                    {properties.map((property) => (
                        <div key={property._id} className='bg-white p-4 rounded shadow'>
                            <FeaturedPropertyCard key={property._id} property={property}></FeaturedPropertyCard>

                        </div>
                    ))}
                </div>
            </div>
        </section>

      
    </div>
  );
}

export default FeaturedProperties;


