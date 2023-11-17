import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { registerSchema } from "@/app/validationSchemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
