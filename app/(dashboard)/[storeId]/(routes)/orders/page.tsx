import getOrders from "@/actions/getOrders";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import OrderClient from "./components/client";
import { OrderColumn } from "./components/columns";

type OrderPageParams = Promise<{ storeId: string }>;

const OrdersPage = async ({ params }: { params: OrderPageParams }) => {
  const { storeId } = await params;
  const billboards = await getOrders(storeId);

  const formattedOrders: OrderColumn[] = (billboards || [])?.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
