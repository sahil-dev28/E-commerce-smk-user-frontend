import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, LogOut, MoreVertical, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useShowMeQuery } from "@/hooks/profile/useShowMeQuery";
import { useProfileUpdate } from "@/hooks/profile/useProfileUpdate";
import type { UpdateProfileData } from "@/types/auth.type";
import { updateProfileSchema } from "@/schemas";
import ProfileImage from "./ProfileImage";
import { AddressForm } from "@/components/address/CreateAddressForm";
import { useGetAddress } from "@/hooks/address/useGetAddress";
import AddressCard from "@/addresses/AddressCard";
import { useLogout } from "@/hooks/auth/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProfileOverview() {
  const navigate = useNavigate();
  const { data: showMeData, isLoading, isError } = useShowMeQuery();
  const { mutateAsync: updatedData } = useProfileUpdate();
  const { data } = useGetAddress();
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync: logoutUser } = useLogout();

  const addressList = data?.addresses || [];

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema) as Resolver<UpdateProfileData>,
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNo: "",
      gender: null,
      dob: null,
    },
  });

  useEffect(() => {
    if (showMeData?.user) {
      form.reset({
        firstName: showMeData.user.firstName,
        lastName: showMeData.user.lastName,
        contactNo: showMeData.user.contactNo,
        gender: showMeData.user.gender ?? null,
        dob: showMeData.user.dob ? new Date(showMeData.user.dob) : null,
      });
    }
  }, [showMeData, form]);

  const onSubmit = async (values: UpdateProfileData) => {
    await updatedData(values);
    navigate("/");
  };

  const logoutHandler = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (isError) return <div className="p-10">Failed to load profile</div>;

  return (
    <div className="min-h-screen mx-auto">
      <div className="px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mx-auto">
          <Card className="flex flex-col items-center p-0 relative">
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDialog(true);
                    }}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. You will be logged out from
                      your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logoutHandler}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <ProfileImage
              profileImage={showMeData?.user.profileImage}
              profileImageId={showMeData?.user.profileImageId}
            />
            <h1 className="text-lg font-semibold mt-15">
              {showMeData?.user.firstName} {showMeData?.user.lastName}
            </h1>
            <div className="flex items-center mb-4 gap-2 lg:mt-4 text-muted-foreground">
              <Users />
              Profile Overview
            </div>
          </Card>
          <div className="xl:w-250 flex justify-center">
            <Card className="max-w-4xl w-full">
              <CardHeader>
                <CardTitle className="text-lg tracking-wide">
                  Basic Details
                </CardTitle>
              </CardHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} id="profile">
                <CardContent className="space-y-6">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Field data-invalid={!!form.formState.errors.firstName}>
                      <FieldLabel>First Name</FieldLabel>
                      <Input {...form.register("firstName")} />
                      <FieldError>
                        {form.formState.errors.firstName?.message}
                      </FieldError>
                    </Field>
                    <Field data-invalid={!!form.formState.errors.lastName}>
                      <FieldLabel>Last Name</FieldLabel>
                      <Input {...form.register("lastName")} />
                      <FieldError>
                        {form.formState.errors.lastName?.message}
                      </FieldError>
                    </Field>

                    <Field data-invalid={!!form.formState.errors.contactNo}>
                      <FieldLabel>Contact Number</FieldLabel>
                      <Input {...form.register("contactNo")} />
                      <FieldError>
                        {form.formState.errors.contactNo?.message}
                      </FieldError>
                    </Field>
                  </FieldGroup>
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Gender</FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value ?? undefined}
                              onValueChange={(value) => {
                                if (value) {
                                  field.onChange(value);
                                }
                              }}
                            >
                              <SelectTrigger id="form-rhf-complex-gender">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FieldError>{fieldState.error?.message}</FieldError>
                          </Field>
                        );
                      }}
                    />
                    <Controller
                      name="dob"
                      control={form.control}
                      render={({ field }) => (
                        <Field className="mt-1">
                          <Label>Date of birth</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="date"
                                className="justify-between font-normal"
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : ""}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden">
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={
                                  field.value
                                    ? new Date(field.value as Date)
                                    : undefined
                                }
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                onSelect={(date) => field.onChange(date)}
                              />
                            </PopoverContent>
                          </Popover>
                        </Field>
                      )}
                    />
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        value={showMeData?.user.email}
                        disabled
                        className="bg-muted/50 cursor-not-allowed"
                      />
                    </Field>
                  </FieldGroup>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="xl:mt-10 xl:mx-164 w-fit cursor-pointer"
                  >
                    {form.formState.isSubmitting
                      ? "Updating..."
                      : "Update Profile"}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
        <div className="gap-8 max-w-fit mx-auto mt-10">
          <div className="xl:w-250 flex justify-center">
            <Card className="max-w-4xl w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>Address Book</CardTitle>
                  <AddressForm mode="create" />
                </div>
              </CardHeader>
              <AddressCard addressList={addressList} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
