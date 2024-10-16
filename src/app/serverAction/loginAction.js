"use server"

import { redirect } from "next/dist/server/api-utils";
import { signIn } from "../auth";
import Dbconnection from "../utils/config/db"

export async function loginAction(UserLoginDetails){
    await Dbconnection();
    console.log("sample details:",UserLoginDetails)

    try {
        const response= await signIn('credentials',{
            email:UserLoginDetails.email,
            password:UserLoginDetails.password,
            redirect:false
        })
        return {response:true}
    } catch (error) {
        console.log("credientials failed");
    }
}