import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill,FaMapMarker } from 'react-icons/fa';

function FeaturedPropertyCard({property}) {

   const propertyLocal = property;

  const getRateDisplay = () => {
    const rates = propertyLocal.rates;
    if (rates?.monthly) return `$${rates.monthly.toLocaleString()}/mo`;
    if (rates?.weekly) return `$${rates.weekly.toLocaleString()}/wk`;
    if (rates?.nightly) return `$${rates.nightly.toLocaleString()}/night`;
    return "Price not available";
  };


  return (
    <div>
      <div
            className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
          >
            <Image
              src={property.images?.[0] || "/default-property.jpg"} // ✅ Use fallback image
              alt={property.name || "Property Image"}
              width={0}
              height={0}
              sizes="100vw"
              class="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">{property.name}</h3>
              <div className="text-gray-600 mb-4">{property.type}</div>
              <h3
                className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
              >
                {getRateDisplay()}
              </h3>
              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                   <FaBed className="md:hidden lg:inline" />  {propertyLocal.beds}{" "}
                  <span className="md:hidden lg:inline">Beds</span>
                </p>
                <p>
                  <FaBath className="md:hidden lg:inline" /> {propertyLocal.baths}
                  <span className="md:hidden lg:inline">Baths</span>
                </p>
                <p>
                  <FaRulerCombined className="md:hidden lg:inline" />
                  {propertyLocal.square_feet}{" "}<span className="md:hidden lg:inline">sqft</span>
                </p>
              </div>

              <div
                className="flex justify-center gap-4 text-green-900 text-sm mb-4"
              >  {(propertyLocal.rates?.nightly) && <p><FaMoneyBill className="md:hidden lg:inline" /> Nightly</p>}
                {(propertyLocal.rates?.weekly) && <p><FaMoneyBill className="md:hidden lg:inline" /> Weekly</p>}
                {(propertyLocal.rates?.monthly) && <p><FaMoneyBill className="md:hidden lg:inline" /> monthly</p>}
              </div>

              <div className="border border-gray-200 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                 <FaMapMarker className="text-orange-700 mt-1" />
                  <span className="text-orange-700">  {propertyLocal.location?.city} {propertyLocal.location?.state} </span>
                </div>
                <Link
                   href={`/properties/${propertyLocal._id}`}
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        
    </div>
  );
}

export default FeaturedPropertyCard;
