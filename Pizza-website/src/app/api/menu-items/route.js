import { PrismaClient } from "@prisma/client";
import { isAdmin } from "../auth/[...nextauth]/route";

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
  const { name, description, basePrice, image, category, sides, sizes } = await parseJSONInput(req, 'POST');  

  if (await isAdmin()) {
    try {
      const newMenuItem = await prisma.MenuItem.create({
        data: {
          name: name, 
          description: description,
          image: image, 
          basePrice: basePrice,
          category: {
            connect: {
              id: category.id, 
            }
          }, 
          sizes: {
            create: sizes.map(size => ({
              extraPriceSize: {
                connect: {
                  id: size.id, 
                }
              }
            })) 
          },              
          sides: {
            create: sides.map(side => ({
              extraPriceSide: {
                connect: {
                  id: side.id, 
                }
              }
            })) 
          },    
        }
      });

      console.log("YAYAYYAYA", newMenuItem);
      return new Response(
        JSON.stringify({ newMenuItem }),
        { status: 200 },
      ); 

    } catch(error) {
      console.error('Failed to create menu item at /api/menu-items', error.message); 
    }
  } 
  return new Response(
    JSON.stringify({ message: "Unauthorized." }), 
    { status: 403 }
  );
}

export async function PUT(req) {
  const {_id, ...data} = await parseJSONInput(req, 'PUT'); 
  const { name, description, basePrice, image, category, sides, sizes } = { data }; 

  if (await isAdmin()) {
    try {
      await prisma.MenuItem.update({
        where: { id: Number(_id) },
        data: {
          name: name, 
          description: description,
          image: image, 
          basePrice: basePrice,
          category: {
            connect: {
              id: category.id, 
            }
          }, 
          sizes: {
            create: sizes.map(size => ({
              extraPriceSize: {
                connect: {
                  id: size.id, 
                }
              }
            })) 
          },              
          sides: {
            create: sides.map(side => ({
              extraPriceSide: {
                connect: {
                  id: side.id, 
                }
              }
            })) 
          },    
        }
      }); 

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
      ); 

    } catch(error) {
      console.error('Failed to update menu item at /api/menu-items', error.message); 
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

    if (id) {
      const menuItem = await prisma.MenuItem.findUnique({
        where: { id: Number(id) },
        include: {
          sizes: true, 
          sides: true, 
          category: true, 
        }
      }); 

      console.log("menuuuuuuu", menuItem); 

      if (!menuItem) {
        return new Response(
          JSON.stringify({ error: 'Menu item not found' }), 
          { status: 404 }
        ); 
      }

      return new Response(
        JSON.stringify(menuItem), 
        { status: 200 }
      ); 

    } 
    const allMenuItems = await prisma.MenuItem.findMany({
      include: {
        sizes: true, 
        sides: true, 
        category: true, 
      }
    });
        
    return new Response(
      JSON.stringify(allMenuItems), 
        { status: 200 }
    );

    } catch(error) {
      console.error('Failed to fetch size(s) at GET /api/menu-items', error.message); 
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
      await prisma.MenuItem.delete({
        where: { id: Number(_id) },
      }); 

      return new Response(
        JSON.stringify({ success: 'true' }),
        { status: 200 }
      ); 

    } catch(error) {
      console.error('Failed to delete menu item.', error.message); 
    }
  }
  return new Response(
    JSON.stringify({ message: "Unauthorized." }), 
    { status: 403 }
  ); 
}