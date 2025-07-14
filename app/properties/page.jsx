
import React from "react";
//  import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertiesPage = async () => {

  //  console.log(properties);
  await connectDB();
  const properties=await Property.find({}).lean();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.lenght === 0 ? (
          <p>No Properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                property={property}
                key={property._id}
              ></PropertyCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
