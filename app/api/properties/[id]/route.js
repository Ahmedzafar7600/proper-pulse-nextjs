import connectDB from "@/config/database";
import Property from "@/models/Property";


export const GET= async (request,{params})=>{
    try{
        await connectDB();
        const property=await Property.findById(params.id);
        if(!property){
            return new Response(JSON.stringify({"Message":"No Property found against this ID"}),{status:200});
        }
        else
        return new Response(property,{status:200});
    }
    catch(exception){
        return new Response(JSON.stringify({"message":'Something Went Wrong'}),{status:500});
    }

}; 