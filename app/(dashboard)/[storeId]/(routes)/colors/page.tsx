import getColors from "@/actions/getColors";
import { format } from "date-fns";
import ColorsClient from "./components/client";
import { ColorColumn } from "./components/columns";

type ColorsPageParams = Promise<{ storeId: string }>;

const ColorsPage = async ({ params }: { params: ColorsPageParams }) => {
  const { storeId } = await params;
  const colors = await getColors(storeId);

  const formattedColors: ColorColumn[] = (colors || [])?.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
