import { PrismaClient } from "@prisma/client";
import { isAdmin } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function parseJSONInput(req, method) {
  try {
    const data = await req.json(); 
    return data; 

  } catch(error) {
    console.error(`Error parsing JSON in ${method} /api/menu-items:`, error); 
    return new Response(
        JSON.stringify({ error: "Invalid JSON format." }), 
        { status: 400 }
    );
  }
}

export async function POST(req) {
  const body = await parseJSONInput(req, 'POST'); 

  if (await isAdmin()) {
    try {
      await prisma.ExtraPriceSide.create({
        data: body 
      }); 

      return new Response(
        JSON.stringify({ success: true }), 
        { status: 200 }); 

    } catch (error) {
      console.error('Failed to create side', error.message); 
    }
  }
  return new Response(
    JSON.stringify({ message: "Unauthorized." }), 
    { status: 403 }
  ); 
}

export async function GET(req) {
  try {
    const url = new URL(req.url); 
    const id = url.searchParams.get('id'); 
  
    let result = null; 

    if (id) {
      result = await prisma.extraPriceSide.findUnique({
        where: {
          id: Number(id), 
        }, 
      }); 
    } else {
      result = await prisma.ExtraPriceSide.findMany(); 
    }

    return new Response(
      JSON.stringify(result), 
      { status: 200 }
    )

  } catch(error) {
    console.error('Failed to fetch side(s) at GET /api/menu-items/sides', error.message); 
  }
}