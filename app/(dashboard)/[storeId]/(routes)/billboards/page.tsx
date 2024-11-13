import getBillboards from "@/actions/getBillboards";
import { format } from "date-fns";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";

type BillboardPageParams = Promise<{ storeId: string }>;

const BillboardsPage = async ({ params }: { params: BillboardPageParams }) => {
  const { storeId } = await params;
  const billboards = await getBillboards(storeId);

  const formattedBillboards: BillboardColumn[] = (billboards || [])?.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
