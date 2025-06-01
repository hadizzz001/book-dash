import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const {   
      title,
description,
price,
discount,
img,
category, 
subcategory,
stock,
arrival 
      } = body;

console.log("body are: ",body);



    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discount,
        img,
        category, 
        subcategory,
        stock,
        arrival 
          
      },
    });

    

    return new Response(JSON.stringify({ message: 'Product created successfully', product }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

 
export async function GET(req) {
  try {
    const latestProduct = await prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return new Response(JSON.stringify(latestProduct), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching latest product:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch latest product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

