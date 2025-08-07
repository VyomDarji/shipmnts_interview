import {NextResponse,NextRequest} from 'next/server';
import {prisma} from "@/lib/prisma"
import { success } from 'zod';

// {
//   "store_location": "Delhi",
//   "valid_from": "2025-08-01",
//   "valid_to": "2025-08-31",
//   "items": [
//     {
//       "category": "veggie",
//       "name": "Tomato",
//       "half_price": 14,
//       "full_price": 27,
//       "extra_charge": 15
//     }
//   ]
// }

export async function POST(request:NextRequest,response:NextResponse)
{
    const {store_location,valid_from,valid_to,items} =await request.json();
    if(!store_location || !valid_from || !valid_to || !items)
    {
        return NextResponse.json({
            success:false,
            message:"Please enter the details",
            status:400,
        });
    }
    try{
        const pricing_plan=await prisma.PricingPlan.findUnique({
            where:
            {
                store_location:store_location,
            }
        });

        if(pricing_plan)
        {
            return NextResponse.json({
            success:false,
            message:"Store with this location already exists",
        });
        }

        const create=await prisma.PricingPlan.create({
            data:
            {
                store_location:store_location as string,
  valid_from: valid_from,
  valid_to: valid_to,
  items: items
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