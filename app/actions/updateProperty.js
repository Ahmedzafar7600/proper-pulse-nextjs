'use server'
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function updateProperty(propertId,formData) {
    console.log(formData);
    console.log(formData.get('name'));
    console.log(formData.getAll('amenities'));
    
    await connectDB();
    const sessionUser=await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {userId} =sessionUser;

    const existingProperty=await Property.findById(propertId);

    //Verify OWnerShip
    if(existingProperty.owner.toString()!== userId){
        throw new Error('Current User does not own this property');
    }

    

    ////Accessing all values from amenties and images
    const amenities=formData.getAll('amenities');
    const images=formData.getAll('images').filter((image)=>image.name!=='' );
    // .map((image)=>image.name);
    console.log(images);
    const propertData={
         owner:userId,
        type:formData.get('type'),
        name:formData.get('name'),
        description:formData.get('description'),
        location:{
            street:formData.get('location.street'),
            city:formData.get('location.city'),
            state:formData.get('location.state'),
            zipcode:formData.get('location.zipcode'),
        },
        beds:formData.get('beds'),
        baths:formData.get('baths'),
        square_feet:formData.get('square_feet'),
        amenities,
        rates:{
            weekly:formData.get('rates.weekly'),
            monthly:formData.get('rates.monthly'),
            nightly:formData.get('rates.nightly'),
        },
        seller_info:{
            name:formData.get('seller_info.name'),
            email:formData.get('seller_info.email'),
            phone:formData.get('seller_info.phone'),
        },
        // images
    }
    console.log(propertData);

    const updatedProperty=await Property.findByIdAndUpdate(propertId,propertData);

    revalidatePath('/','layout');
    redirect(`/properties/${propertId}`);

    
}

export default updateProperty;