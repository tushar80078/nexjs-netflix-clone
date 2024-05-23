import prismadb from "../../../../lib/prismadb"
import serverAuth from "../../../../lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
  ){
    try {
        await  serverAuth(req);

        const movieCount = await prismadb.movie.count();
        const randomIndex= Math.floor(Math.random()* movieCount);
        const randomMovie = await prismadb.movie.findMany({
            take:1,
            skip:randomIndex
        })
        return NextResponse.json(randomMovie[0]);
    } catch (error) {
            console.log('ERROR-RANDOM-API',error)
    }
  }