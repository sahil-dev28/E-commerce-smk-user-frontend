import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import type { Address, Product } from "@/types/auth.type";
import { Clock } from "lucide-react";
import { AlertDeleteDialog } from "./AlertDeleteDialog";
import useGetCartTotalPrice from "@/hooks/product/cart/useGetCartPrice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useShowMeCouponQuery,
  type Coupon,
} from "@/hooks/product/cart/useShowMeCoupons";
import { useState } from "react";
import OrderPayment from "../payment/OrderPayment";
import { useGetAddress } from "@/hooks/address/useGetAddress";
import { Link } from "react-router-dom";

export type CartProductProps = {
  cartProduct: Product[];
};

export default function CartProudctCard({ cartProduct }: CartProductProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<string | undefined>(
    undefined,
  );
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const showMePrice = useGetCartTotalPrice({
    coupon: selectedCoupon,
  });
  const showMeCoupon = useShowMeCouponQuery();
  const showMeAddress = useGetAddress();

  const subTotal = showMePrice.data?.subTotal;
  const totalCartPrice = showMePrice.data?.total;
  const discount = showMePrice.data?.discount || 0;

  const getImageUrl = (image: File | string): string => {
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  return (
    <section>
      <div className="w-full p-5 space-y-20 xl:space-y-10 xl:flex xl:justify-around xl:w-fit xl:mx-auto my-10">
        {/* Card */}
        <div className="w-full">
          <div className="grid grid-rows-1 xl:mr-10 gap-10">
            <div className="flex">
              <h2 className="text-2xl">My Cart ({cartProduct.length} items)</h2>
            </div>

            {cartProduct.map((product) => (
              <div
                key={product.id}
                className="lg:col-span-2 lg:col-start-1 lg:border-t lg:border-b-neutral-600 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0 py-5"
              >
                <div className="mt-3">
                  <ul>
                    <li className="flex md:flex-row justify-evenly xl:justify-center items-center gap-6">
                      <div>
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={getImageUrl(product.image)}
                            className="size-40 sm:size-50 md:size-30"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col items-start space-y-3">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold">{product.name}</h3>
                        </Link>
                        <p className="text-muted-foreground">
                          Size: {product.sizes[0].value}
                        </p>
                        <p className="flex gap-2">
                          <Clock />
                          <span className="text-muted-foreground">
                            7 days return Available
                          </span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-end gap-8 lg:items-center lg:justify-evenly">
                  <div>
                    <NativeSelect>
                      <NativeSelectOption value="apple">1</NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div className="flex justify-center items-center gap-2.5">
                    <p> ₹{product.price - product.discountAmount}</p>
                  </div>
                  <div>
                    <AlertDeleteDialog product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 w-full xl:grid-cols-none xl:w-xl space-y-5">
          {/* Coupon */}
          <div className="">
            <Card className="p-5">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Apply Coupon</h3>
                <p className="text-muted-foreground">Using a Promo Code ?</p>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <Select
                  onValueChange={(value) => {
                    setSelectedCoupon(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select coupon code" />
                  </SelectTrigger>
                  <SelectContent>
                    {showMeCoupon.data?.coupons.map((coupon: Coupon) => (
                      <SelectItem
                        key={coupon.id}
                        value={coupon.id}
                        className="overflow-x-hidden"
                      >
                        {coupon.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          {/* Address */}
          <div className="xl:max-w-[425px] xl:space-y-5">
            <Card className="p-5">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Select Address</h3>
              </div>
              <div className="flex gap-2 justify-between items-center overflow-hidden">
                <Select
                  onValueChange={(value) => {
                    setSelectedAddress(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select address" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[400px]">
                    {showMeAddress.data?.addresses.map((address: Address) => (
                      <SelectItem key={address.id} value={address.id}>
                        <div className="flex flex-col gap-1 w-full">
                          <span className="font-semibold">
                            {address.address}
                          </span>
                          <span className="text-muted-foreground">
                            {address.city}, {address.state} - {address.pincode}
                          </span>
                          {/* <Badge className="mt-1">{address.type}</Badge> */}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
          {/* Pricing */}
          <div className="min-w-full xl:mt-7">
            <Card className="p-5 text-lg">
              <h3 className="font-bold">Price Details</h3>
              <Separator />
              <CardContent className="text-muted-foreground space-y-5 p-0">
                <div>
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <span className="text-foreground">
                      ₹{subTotal?.toFixed()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Discount</p>
                      <span>-₹{discount.toFixed()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <span className="text-foreground">Free Delivery</span>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="p-0">
                <div className="space-y-5 w-full">
                  <div className="flex justify-between text-lg xl:text-xl font-bold">
                    <p>Total</p>
                    <span>₹{totalCartPrice?.toFixed()}</span>
                  </div>

                  <OrderPayment
                    couponId={selectedCoupon}
                    selectedAddressId={selectedAddress}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
