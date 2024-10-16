import Dbconnection from "@/app/utils/config/db";
import ProductModel from "@/app/utils/models/product";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    await Dbconnection();
    const {id}= params
    console.log("dynamic id",id)
   try {
    if(!id){
        return NextResponse.json({success:false,message:'no user found'},{status:404})
    }
    const product =await ProductModel.findById(id)
    return NextResponse.json({success:true,data:product})
   } catch (error) {
    console.log(error)
    return NextResponse.json({success:false,message:'ID is missing'})
   }
}