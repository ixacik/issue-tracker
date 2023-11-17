import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {
  createIssueSchema,
  updateIssueStatusSchema,
} from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const validation = updateIssueStatusSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: body.id },
    data: { status: body.status },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
