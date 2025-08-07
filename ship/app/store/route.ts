import {NextResponse,NextRequest} from 'next/server';
import {prisma} from "@/lib/prisma"
import { success } from 'zod';

export async function POST(request:NextRequest,response:NextResponse)
{
    const {store_location,currency,tax_percentage,premium_items} =await request.json();
    if(!store_location || !currency || !tax_percentage || !premium_items)
    {
        return NextResponse.json({
            success:false,
            message:"Please enter the details",
            status:400,
        });
    }
    try{
        const Store=await prisma.Store.findUnique({
            where:
            {
                store_location:store_location,
            }
        });

        if(Store)
        {
            return NextResponse.json({
            success:false,
            message:"Store with this location already exists",
        });
        }

        const create=await prisma.Store.create({
            data:
            {
                store_location:store_location as string,
            currency:currency as string,
            tax_percentage:tax_percentage,
            preimum_items:premium_items,
            }
        });

        return NextResponse.json({
            success:true,
            message:"Store Created Successfully",
        });
    }
    catch{
        return NextResponse.json({
            success:false,
            message:"error occured",
        });
    }
}