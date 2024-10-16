import Dbconnection from "@/app/utils/config/db";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import ProductModel from "@/app/utils/models/product";
import { NextResponse } from "next/server";
export async function GET() {
    await Dbconnection()
    const records =await ProductModel.find({})
    return NextResponse.json({data:records})
    
}
export async function POST(request) {
  try {
    await Dbconnection();

    const formData = await request.formData();
    const title = formData.get('title');
    const price = formData.get('price');
    const offer = formData.get('offer');
    const amen = formData.get('amen');
    const desc = formData.get('desc');
    const image = formData.get('image');

    // Define upload directory path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure that the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Handle image upload
    const buffer = Buffer.from(await image.arrayBuffer());
    const imagePath = path.join(uploadDir, image.name);
    await writeFile(imagePath, buffer);

    // Save product to database
    const newProduct = new ProductModel({
      title,
      price,
      offer,
      amen,
      desc,
      image: `/uploads/${image.name}`, // Store relative path
    });
    await newProduct.save();

    return new Response(JSON.stringify({ success: true, message: 'Product created successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Product creation failed' }), {
      status: 500,
    });
  }
}
