import getColorById from "@/actions/getColorById";
import ColorForm from "./components/color-form";

type ColorPageParams = Promise<{ colorId: string }>;

const ColorPage = async ({ params }: { params: ColorPageParams }) => {
  const { colorId } = await params;
  const size = await getColorById(colorId);

  // console.log(size);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={size} />
      </div>
    </div>
  );
};

export default ColorPage;
