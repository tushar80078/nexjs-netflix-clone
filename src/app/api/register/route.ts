import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb"
import { signIn } from "next-auth/react";                                                                                                                                                   

export async function POST(
    req: Request,
  ) {
    try {
        const {email, name, password} = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return new NextResponse("Email taken", { status: 422 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user  = await prismadb.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image:'',
                emailVerified: new Date()
            }
        })
        return NextResponse.json(user);

    } catch (error) {
            console.log("API-ERROR-Register-Route",error)
    }
  }