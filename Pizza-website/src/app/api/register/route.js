import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); 
    const notHashedPassword = body.password; 

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    // Create the User 
    const createdUser = await prisma.User.create({
      data: body,
    });

    // Create the UserInfo 
    await prisma.UserInfo.create({
      data: {
        userId: createdUser.id 
      }  
    });

    return Response.json(createdUser);

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Failed to register user.", error: error.message }, { status: 500});
  }
}
