import Navbar from "@/components/navbar";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
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
