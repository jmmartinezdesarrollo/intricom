import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const bookings = await prisma.hotelBooking.findMany();
    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    return new Response("Error fetching hotel bookings", { status: 500 });
  }
}

export async function POST(req) {
  const { hotelId, clientId } = await req.json();

  try {
    const newBooking = await prisma.hotelBooking.create({
      data: {
        hotelId,
        clientId,
        createDate: new Date(),
      },
    });
    return new Response(JSON.stringify(newBooking), { status: 201 });
  } catch (error) {
    console.error("Error creating hotel booking:", error);
    return new Response("Error creating hotel booking", { status: 500 });
  }
}
