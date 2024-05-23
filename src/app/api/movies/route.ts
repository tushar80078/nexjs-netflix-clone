import { NextApiRequest,NextApiResponse } from "next";

import prismadb from "../../../../lib/prismadb";
import serverAuth from "../../../../lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
  ){
    try {
        await serverAuth(req);

        const movies =await prismadb.movie.findMany();
        return NextResponse.json(movies);
    } catch (error) {
        console.log('ERROR-MOVIES-API',error);
        return new NextResponse('Error',{status:400})
    }
  }