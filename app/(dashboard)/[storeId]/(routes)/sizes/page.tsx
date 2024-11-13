import getSizes from "@/actions/getSizes";
import { format } from "date-fns";
import SizesClient from "./components/client";
import { SizeColumn } from "./components/columns";

type SizesPageParams = Promise<{ storeId: string }>;

const SizesPage = async ({ params }: { params: SizesPageParams }) => {
  const { storeId } = await params;
  const sizes = await getSizes(storeId);

  const formattedSizes: SizeColumn[] = (sizes || [])?.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
