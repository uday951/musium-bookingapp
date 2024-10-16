"use server"

import Dbconnection from "../utils/config/db"

export async function ProductAction(productDetails) {
    await Dbconnection()
    console.log("product details:",productDetails)
}