import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building, HomeIcon, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useCreateAddress } from "@/hooks/address/useCreateAddress";
import { Controller, useForm, type Resolver } from "react-hook-form";
import type { Address, CreateAddressData } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddressSchema } from "@/schemas";
import { useUpdateAddress } from "@/hooks/address/useUpdateAddress";
import { Label } from "../ui/label";

interface DialogDemoProps {
  mode: "create" | "edit";
  address?: Address;
}

export function AddressForm({ mode, address }: DialogDemoProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleModalHandler = () => {
    setIsEditOpen((prevState) => !prevState);
  };
  const { mutateAsync: createAddress } = useCreateAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const form = useForm<CreateAddressData>({
    resolver: zodResolver(createAddressSchema) as Resolver<CreateAddressData>,
    defaultValues: {
      address: undefined,
      city: undefined,
      pincode: undefined,
      state: undefined,
      type: undefined,
    },
  });

  useEffect(() => {
    if (mode === "edit" && address) {
      form.reset({
        address: address.address,
        city: address.city,
        pincode: address.pincode,
        state: address.state,
        type: address.type,
      });
    }
  }, [address, mode]);

  console.log({ errors: form.formState.errors, values: form.getValues() });

  const onSubmit = async (values: CreateAddressData) => {
    if (mode === "create") {
      await createAddress(values);
      form.reset();
      toggleModalHandler();
    }
    if (mode === "edit" && address) {
      await updateAddress({
        id: address.id,
        payload: {
          address: values.address,
          city: values.city,
          pincode: values.pincode,
          state: values.state,
          type: values.type,
        },
      });
      toggleModalHandler();
    }
  };
  const onCancel = () => {
    form.reset();
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={toggleModalHandler}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button
            variant="outline"
            className="cursor-pointer w-full border-none"
          >
            Edit
          </Button>
        ) : (
          <Button className="cursor-pointer w-fit" variant="outline">
            <MapPin />
            Add Address
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="mb-10 flex justify-center items-center">
            <DialogTitle className="text-muted-foreground">
              {mode === "create" ? " Add New Address" : "Edit Address Details"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create" ? " Add new address for express delivery" : ""}
            </DialogDescription>
          </DialogHeader>

          {/* Address Type */}
          <div className="">
            <div className="grid grid-cols-1 w-full">
              <Controller
                name="type"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <RadioGroup
                      defaultValue=""
                      className="w-full justify-between sm:grid-cols-2"
                      value={field.value ?? undefined}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      {...form.register("type")}
                    >
                      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full flex-col items-center gap-4 rounded-md border p-4 shadow-xs outline-none">
                        <RadioGroupItem
                          value="HOME"
                          id="type"
                          className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3"
                          aria-label="plan-radio-basic"
                        />
                        <div className="grid grow justify-items-center gap-4">
                          <HomeIcon />
                          <Label htmlFor="home" className="justify-center">
                            Home
                          </Label>
                          <p className="text-muted-foreground text-center text-xs">
                            Delivery time (9am - 9pm)
                          </p>
                        </div>
                      </div>
                      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full flex-col items-center gap-4 rounded-md border p-4 shadow-xs outline-none">
                        <RadioGroupItem
                          value="OFFICE"
                          className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3"
                        />
                        <div className="grid grow justify-items-center gap-4">
                          <Building />
                          <Label htmlFor="office" className="justify-center">
                            Office
                          </Label>
                          <p className="text-muted-foreground text-center text-xs">
                            Delivery time (9am - 9pm)
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                    <FieldError>
                      {form.formState.errors.state?.message}
                    </FieldError>
                  </div>
                )}
              />
            </div>

            <div className="mt-5">
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 w-full">
                <Field>
                  <FieldLabel>Pincode</FieldLabel>
                  <Input
                    placeholder="90001"
                    id="pincode"
                    type="number"
                    {...form.register("pincode", { valueAsNumber: true })}
                    aria-invalid={
                      form.formState.errors.pincode ? "true" : "false"
                    }
                  />
                  <FieldError>
                    {form.formState.errors.pincode?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>State</FieldLabel>
                  <Input
                    placeholder="Maharashtra"
                    id="state"
                    {...form.register("state")}
                    aria-invalid={
                      form.formState.errors.state ? "true" : "false"
                    }
                  />
                  <FieldError>
                    {form.formState.errors.state?.message}
                  </FieldError>
                </Field>
              </FieldGroup>
            </div>
            <div className="mt-5">
              <FieldGroup className="grid grid-rows-1w-full">
                <Field>
                  <FieldLabel>Address (Building, Street, Area)</FieldLabel>
                  <Input
                    placeholder="Link Road"
                    {...form.register("address")}
                    aria-invalid={
                      form.formState.errors.address ? "true" : "false"
                    }
                  />
                  <FieldError>
                    {form.formState.errors.address?.message}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input
                    placeholder="Mumbai"
                    {...form.register("city")}
                    aria-invalid={form.formState.errors.city ? "true" : "false"}
                  />
                  <FieldError>{form.formState.errors.city?.message}</FieldError>
                </Field>
              </FieldGroup>
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                size="lg"
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="lg" className="px-10 cursor-pointer">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
