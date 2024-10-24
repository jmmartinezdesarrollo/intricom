import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const clients = await prisma.client.findMany();
    return new Response(JSON.stringify(clients), { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return new Response("Error fetching clients", { status: 500 });
  }
}

export async function POST(req) {
  const { name, address, phone } = await req.json();

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        address,
        phone,
        createDate: new Date(),
      },
    });
    return new Response(JSON.stringify(newClient), { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return new Response("Error creating client", { status: 500 });
  }
}
