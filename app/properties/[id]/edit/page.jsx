import React from "react";
import PropertyEditform from "@/components/PropertyEditform";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

export default async function PropertyEditPage({ params }) {
  await connectDB();

  const id = params?.id;

  console.log("Property ID:", id);

  if (!id) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Invalid property ID.
      </h1>
    );
  }

  try {
    const propertyDoc = await Property.findById(id).lean();

    if (!propertyDoc) {
      return (
        <h1 className="text-center text-2xl font-bold mt-10">
          Property Not Found
        </h1>
      );
    }

    const property = convertToSerializableObject(propertyDoc);

    return (
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            {property.name}
            <PropertyEditform property={property} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading property:", error);
    return (
      <h1 className="text-center text-2xl font-bold mt-10 text-red-500">
        Failed to load property.
      </h1>
    );
  }
}
