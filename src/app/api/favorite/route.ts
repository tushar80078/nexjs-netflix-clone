import prismadb from "../../../../lib/prismadb"
import serverAuth from "../../../../lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import { without } from "lodash";

export async function POST(
    req: NextRequest,
  ){
    try {
       const {currentUser} = await  serverAuth(req);

       const {movieId}= await req.json();


       const existingMovie = await prismadb.movie.findUnique({
        where:{
            id:movieId
        }
       })

       if(!existingMovie){
        throw new Error('Invalid Id');
       }

       const updateUser = await prismadb.user.update({
        where:{
            email:currentUser.email || '',
        },
        data:{
            favoritesIds:{
                push:movieId
            }
        }
       })
      
        return NextResponse.json(updateUser);
    } catch (error) {
            console.log('ERROR-Favorite-API',error)
        return new NextResponse('Error',{status:400})

    }
  }

  
export async function DELETE(
    req: NextRequest,
  ){
    try {
       const {currentUser} = await  serverAuth(req);

       const {movieId} = await req.json();


       const existingMovie = await prismadb.movie.findUnique({
        where:{
            id:movieId
        }
       })

       if(!existingMovie){
        throw new Error('Invalid Id');
       }

       const updateFavouratiesIds =  without(currentUser.favoritesIds, movieId);

       const updateUser = await prismadb.user.update({
        where:{
            email:currentUser.email || '',
        },
        data:{
            favoritesIds:updateFavouratiesIds
        }
       })
      
        return NextResponse.json(updateUser);
    } catch (error) {
            console.log('ERROR-Favorite-API',error)
        return new NextResponse('Error',{status:400})

    }
  }