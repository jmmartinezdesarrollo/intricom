import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const hotels = await prisma.hotel.findMany();
    return new Response(JSON.stringify(hotels), { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return new Response("Error fetching hotels", { status: 500 });
  }
}

export async function POST(req) {
  const { name, address } = await req.json();

  try {
    const newHotel = await prisma.hotel.create({
      data: {
        name,
        address,
        createDate: new Date(),
      },
    });
    return new Response(JSON.stringify(newHotel), { status: 201 });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return new Response("Error creating hotel", { status: 500 });
  }
}
