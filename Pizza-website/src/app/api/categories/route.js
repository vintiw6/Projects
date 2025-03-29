import { PrismaClient } from "@prisma/client";
import { isAdmin } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function parseJSONInput(req, method) {
  try {
    const data = await req.json(); 
    console.log("data", data); 
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
  const { name } = await parseJSONInput(req, 'POST'); 

  if (await isAdmin()) {
    try {
      const category = await prisma.Category.create({
        data: { name: name, }
      }); 

      return new Response(
        JSON.stringify({ success: 'true', category }),
        { status: 200 }
      );

    } catch (error) {
      console.error('Failed to create category', error.message); 
    }
  }

  return new Response(
    JSON.stringify({ message: "Unauthorized." }), 
    { status: 403 }
  );
}

export async function PUT(req) {

  const { id, name } = await parseJSONInput(req, 'PUT'); 

  if (await isAdmin()) {
    try {
      const updatedCategory = await prisma.Category.update({
        where: { id: Number(id) },
        data: { name: name, }, 
      }); 

      return new Response(
        JSON.stringify({ sucess: "true", updatedCategory }), 
        { status: 200 }
      ); 

    } catch(error) {
      console.error('Failed to update category', error.message); 
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
      result = await prisma.Category.findUnique({
        where: {
          id: Number(id), 
        }, 
      }); 
    } else {
      result = await prisma.Category.findMany(); 
    }

    return new Response(
      JSON.stringify(result), 
      { status: 200 }
    )

  } catch(error) {
    console.error('Failed to fetch size(s) at GET /api/categories', error.message); 
  }
}

export async function DELETE(req) {
  let _id = -1; 
  try {
    const { searchParams } = new URL(req.url);
    _id = searchParams.get("_id");
  } catch(error) {
    console.error(`Error parsing JSON in DELETE /api/menu-items:`, error); 
    return new Response(
        JSON.stringify({ error: "Missing _id Parameter." }), 
        { status: 400 }
    );
  }

  if (await isAdmin()) {
    try {
      await prisma.Category.delete({
        where: {
          id: Number(_id)
        },
      }); 

      return new Response(
        JSON.stringify({ success: true }), 
        { status: 200 }
      );
 
    } catch(error) {
      console.error('Failed to delete category', error.message); 
    }
  }
  return new Response(
    JSON.stringify({ message: "Unauthorized." }), 
    { status: 403} 
  ); 
}