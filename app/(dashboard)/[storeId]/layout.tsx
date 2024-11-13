import Navbar from "@/components/navbar";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type PageParams = Promise<{ storeId: string }>;
interface LayoutProps {
  children: React.ReactNode;
  params: PageParams;
}

const DashboardLayout = async ({ children, params }: LayoutProps) => {
  const { storeId } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
