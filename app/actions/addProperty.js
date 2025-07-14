'use server'
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
    console.log(formData);
    console.log(formData.get('name'));
    console.log(formData.getAll('amenities'));
    
    await connectDB();
    const sessionUser=await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {userId} =sessionUser;

    

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

    const imageUrls = await Promise.all(
        images.map(async (imageFile) => {
            const imageBuffer = await imageFile.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);
            const imageBase64 = imageData.toString("base64");
    
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, 
                { folder: "propertypulse" }
            );
            return result.secure_url;
        })
    );
    

    propertData.images=imageUrls;

    const newProperty =new Property(propertData);
    await newProperty.save();
    revalidatePath('/','layout');
    redirect(`/properties/${newProperty._id}`)
}

export default addProperty;