import { NextResponse } from "next/server";

export function GET() {

    return NextResponse.json({
        message: "success",
        data: [
            {name: "ahmed" , age:24},
            {name: "youssef" , age:24},
            {name: "roba" , age:24},
        ]
    })
}