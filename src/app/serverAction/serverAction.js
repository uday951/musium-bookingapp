"use server"
import Dbconnection from "../utils/config/db";
import UserModel from "../utils/models/user";

export async function RegisterAction(registerDetails) {
    await Dbconnection();
    console.log("regAction details:", registerDetails);

    if (!registerDetails.email) {
        return { success: false, error: 'Email is required' };
    }

    try {
        await UserModel.create({
            username: registerDetails.username,
            email: registerDetails.email,
            password: registerDetails.password,
            role: "user"
        });
        return { success: true };
    } catch (error) {
        console.error("Error during registration:", error.message);
        return { success: false, error: error.message };
    }
}
