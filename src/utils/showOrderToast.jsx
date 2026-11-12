import { toast } from "sonner";
import OrderToast from "../components/orderToast/OrderToast";


const DURATION = 5000; // میلی‌ثانیه

// مثلاً showOrderToast(1024)
const showOrderToast = (orderNumber) =>
  toast.custom(
    (id) => <OrderToast id={id} orderNumber={orderNumber} duration={DURATION} />,
    { duration: DURATION },
  );

export default showOrderToast;