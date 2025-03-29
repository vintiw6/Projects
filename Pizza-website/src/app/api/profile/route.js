// Technologies involved: 
// - Next.js - profile/route.js : API route that handles profile-related API requests 
// - NextAuth.js - User Authentication 
// - Prisma - PrismaClient used to interact w database to fetch / update user data 
// - JavaScript - asynchrnous operations 

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// allows an authenticated user to update their profile information in the database 
export async function PUT(req) {
  try {
    const data = await req.json();
    const {_id, name, image, ...otherUserInfo} = data; 

    const session = await getServerSession(authOptions); 
    let filterUser = _id ? { id: Number(_id) } : { email: session.user.email }; 

    const user = await prisma.User.findUnique({
      where: filterUser
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.UserInfo.update({
      where: {
        userId: user.id 
      },
      data: otherUserInfo, 
    });

    return Response.json(true); 
  } catch (error) {
    console.error(error); 
    return Response.json({ message: "Error fetching user data", error: error.message }, { status: 500});
  }
}

// retrieve the profile details of the currently authenticated user
// (or another user if (_id) is provided 
export async function GET(req) {
  const url = new URL(req.url); 
  const _id = url.searchParams.get('_id'); 

  const session = await getServerSession(authOptions); 
  const filterUser = _id ? { id: Number(_id) } : { email: session?.user?.email };

  if (!filterUser.email && !filterUser.id) {
    return Response.json({}); 
  }

  try {
    const user = await prisma.User.findUnique({
      where: filterUser,
      include: {
        userinfo: true
      }
    }); 
    return Response.json(user);
  } catch (error) {
    console.error(error); 
    return Response.json({ message: "Error fetching user data", error: error.message }, { status: 500});
  }
}