import prismadb from "../../../../../lib/prismadb"
import serverAuth from "../../../../../lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {params}:{params:{movieId:string}}
  ){
    try {
      const {currentUser}=  await  serverAuth(req);

      const movieId = params.movieId;


      if(typeof movieId !== 'string'){
        throw new Error('Invalid Id');
      }

      if(!movieId){
        throw new Error('Invalid Id');
      }

      const movie = await prismadb.movie.findUnique({
        where:{
            id:movieId
        }
      })

      if(!movie){
        throw new Error('Invalid Id');
      }

        return NextResponse.json(movie);
    } catch (error) {
            console.log('ERROR-MovieId-API',error)
        return new NextResponse('Error',{status:400})
    }
  }