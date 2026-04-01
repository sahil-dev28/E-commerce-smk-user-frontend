import { useState } from "react";
import { useCreateOrder } from "@/hooks/product/order/useCreateOrder";
import { Button } from "@base-ui/react";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useShowMeQuery } from "@/hooks/profile/useShowMeQuery";
import type { Order } from "@/types/auth.type";
import { useVerifyOrder } from "@/hooks/product/order/userVerifyOrder";

export default function OrderPayment({
  couponId,
  selectedAddressId,
}: {
  couponId: string;
  selectedAddressId: string;
}) {
  const [showAlert, setShowAlert] = useState(false);

  const { error, Razorpay } = useRazorpay();
  const { mutateAsync: createOrderMutation, isPending: createOrderIsPending } =
    useCreateOrder();
  const { data: userDetails } = useShowMeQuery();
  const { mutateAsync: verifyOrderMutation } = useVerifyOrder();

  const createOrderHandler = async () => {
    const { order, key } = await createOrderMutation({
      addressId: selectedAddressId,
      coupon: couponId,
    });
    return { order, key };
  };

  const paymentHandler = ({ order, key }: { order: Order; key: string }) => {
    const options: RazorpayOrderOptions = {
      name: userDetails?.user.firstName,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      notes: order.notes,
      key,
      handler: (response) => {
        console.log(response);
        verifyOrderMutation({
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          orderId: response.razorpay_order_id,
        });
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  const handlePayNow = async () => {
    if (!selectedAddressId) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    const { order, key } = await createOrderHandler();
    paymentHandler({ order, key });
  };

  return (
    <div className="space-y-4">
      {createOrderIsPending && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}

      {showAlert && (
        <Alert variant="destructive">
          <AlertTitle>Please select an address to place the order.</AlertTitle>
        </Alert>
      )}

      <Button
        className="w-full cursor-pointer rounded-xl bg-primary size-8"
        onClick={handlePayNow}
        disabled={createOrderIsPending}
      >
        Pay Now
      </Button>
    </div>
  );
}
