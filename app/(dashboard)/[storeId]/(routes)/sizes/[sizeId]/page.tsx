import getSizeById from "@/actions/getSizeById";
import SizeForm from "./components/size-form";

type SizePageParams = Promise<{ sizeId: string }>;

const SizePage = async ({ params }: { params: SizePageParams }) => {
  const { sizeId } = await params;
  const size = await getSizeById(sizeId);

  // console.log(size);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
