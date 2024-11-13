import getBillboardById from "@/actions/getBillboardById";
import BillboardForm from "./components/billboard-form";

type BillboardPageParams = Promise<{ billboardId: string }>;

const BillboardPage = async ({ params }: { params: BillboardPageParams }) => {
  const { billboardId } = await params;
  const billboard = await getBillboardById(billboardId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
