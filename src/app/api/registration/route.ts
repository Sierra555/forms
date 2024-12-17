import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from '@/app/UserSchema';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const verified = UserSchema.safeParse(data);

    if (verified.success) {
        return NextResponse.json({message: 'User registered', user: verified.data })
    } else {
        return NextResponse.json({message: 'Invalid data', error: verified.error.format()},
           {status: 404}
        )
    };
}