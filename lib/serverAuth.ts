import prismadb from "./prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const serverAuth = async(req:NextRequest)=>{
    const token = await getToken({ req,
        secret: process.env.NEXTAUT_JWT_SECRET,});

    if(!token){
        throw new Error('Not signed in');
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email:token?.email ||''
        }
    })


    if(!currentUser){
        throw new Error('Not signed in');
    }

    return {currentUser}
}

export default serverAuth;