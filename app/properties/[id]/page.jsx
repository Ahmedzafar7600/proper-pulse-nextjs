// "use client";
import React, { Fragment } from "react";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/utils/convertToObject";
import BookMarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";


const PropertyServerPage = async ({ params, searchParams }) => {
  ///we use params.id bacause id is the parameter name in the router folder
  await connectDB();
  const { id } = await params;  // ✅ Correct way to handle params
  const propertyDoc = await Property.findById(id).lean();
  const property=convertToSerializableObject(propertyDoc);
  if(!property){
    return (<h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>)
  }
  return (
    <Fragment>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className=" mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <PropertyDetails property={property}/>
          <aside className="space-y-4">
            <BookMarkButton property={property}></BookMarkButton>
            <ShareButtons property={property}></ShareButtons>
            <PropertyContactForm property={property}></PropertyContactForm>
            
          </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images}></PropertyImages>
    </Fragment>
  );
};

export default PropertyServerPage;

const PropertyPage = () => {
  ///There are all for cleint
  // const router=useRouter();
  // const params=useParams();
  // const searchParams=useSearchParams();
  // const pathName=usePathname();
  // console.log(router);
  // console.log(params);
  // console.log(searchParams);
  // console.log(pathName);
  console.log("Property Page component");
  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      Property Page
      {/* {params.id} , {searchParams.get('name')} , {pathName} */}
      <button onClick={() => router.replace("/")}>Go to Home</button>
    </div>
  );
};

// export default PropertyPage;
