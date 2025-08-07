import {NextResponse,NextRequest} from 'next/server';
import {prisma} from "@/lib/prisma"

export async function POST(request:NextRequest, {params}:{params: {store_location: string}})
{
    const store_location=params.store_location;
    const store=await await prisma.Store.create({
            where:
            {
                store_location:store_location,
            }
        });
    const {currency,tax_percentage,premium_items} =await request.json();
    if(!currency || !tax_percentage || !premium_items)
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

        const updat=await prisma.Store.update({
            where:
            {
                store_location:store_location,
            },
            data:
            {
            currency:currency as string,
            tax_percentage:tax_percentage,
            preimum_items:premium_items,
            }
        });

        return NextResponse.json({
            success:true,
            message:"Store Updated Successfully",
        });
    }
    catch{
        return NextResponse.json({
            success:false,
            message:"error occured",
        });
    }
}