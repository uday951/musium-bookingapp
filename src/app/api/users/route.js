import Dbconnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/user";
import { NextResponse } from "next/server";





export async function GET() {
    await Dbconnection();

    try {
        const users = await UserModel.find({role:{$ne:'admin'}},{password:0})
        if(!users){
            return NextResponse.json({success:flase, message:'no user'},{status:404})
        }
        return NextResponse.json({success:true, users},{status:200})
    } catch (error) {
        console.log(erro);
        return NextResponse.json({success:false,message:'failed to get users'},{status:500})
    }
    
}