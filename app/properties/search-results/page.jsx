import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import Link from 'next/link';


import React from 'react';
import { FaArrowAltCircleLeft, FaArrowLeft } from 'react-icons/fa';

async function SearchResultsPage({searchParams:{location, propertyType}}) {
    await connectDB();
    const locationPattern = location ? new RegExp(location, 'i') : undefined;
   
     let query={$or:[
        {name:locationPattern},
        {description:locationPattern},
        {'location.street':locationPattern},
        {'location.city':locationPattern},
        {'location.state':locationPattern},
        {'location.zipcode':locationPattern},
    ]
}

  if(propertyType && propertyType !== 'All') {
     const propertyTypePattern = propertyType && propertyType !== 'All' ? new RegExp(propertyType, 'i') : undefined;
     query.type = propertyTypePattern;
  }

  const propertyQueryResults = await Property.find(query).lean();
  const properties = propertyQueryResults.map((property) => convertToSerializableObject(property));
  console.log('Properties:', properties);


  return (
    <div>
      <h1>Search Results</h1>
       <section className="py-4 mb-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-w-7xl mx-auto px-4 fle
        x flex-col items-center">
            {properties.length > 0 ? (
            properties.map((property) => (
                <div key={property._id} className="p-4 border rounded-lg">
                <h2 className="text-xl font-bold">{property.name}</h2>
                <p>{property.description}</p>
                <p>{property.location.street}, {property.location.city}, {property.location.state} {property.location.zipcode}</p>
                <p>Type: {property.type}</p>
                </div>
            ))
            ) : (
            <p className="text-gray-500">No properties found.</p>
            )}
        </div>
       </section>
       <section className="px-4 py-6">
        <div className="container lg:container mx-auto px-4 py-6">
            <Link href="/properties" className="text-blue-500 hover:underline"><FaArrowAltCircleLeft className='mr-2 mb-1'></FaArrowAltCircleLeft> Back to Properties</Link>
        </div>
       </section>
       
    </div>
  );
}

export default SearchResultsPage;

