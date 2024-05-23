import serverAuth from "../../../../lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
  ) {
    try {
        const {currentUser} = await serverAuth(req);

        return NextResponse.json(currentUser);
        
    } catch (error) {
        console.log('ERROR-CURRUNT-API',error)
        return new NextResponse('Error',{status:400})
    }
  }