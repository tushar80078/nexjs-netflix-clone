import prismadb from "../../../../lib/prismadb"
import serverAuth from "../../../../lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
  ){
    try {
      const {currentUser}=  await  serverAuth(req);

      const favoriteMovies = await prismadb.movie.findMany({
        where:{
            id:{
                in: currentUser?.favoritesIds
            }
        }
      })

        return NextResponse.json(favoriteMovies);
    } catch (error) {
            console.log('ERROR-Favorites-API',error)
        return new NextResponse('Error',{status:400})
    }
  }