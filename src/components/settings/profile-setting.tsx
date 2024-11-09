import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { debounce } from "lodash";
import { CalendarIcon, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  pictureMutationFn,
  profileMutationFn,
} from "~/actions/settings/profile";
import { userDetailsQueryOptions } from "~/actions/settings/query-options";
import { cn } from "~/lib/utils";
import { profileSchema, TProfileSchema } from "~/schema/settings";
import useUserStore from "~/store/persist-storage/user";
import useUserDetailsStore from "~/store/settings/user-details";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const interests = ["Skiing", "Travel", "Coffee", "Science", "Videography"];

interface ProfileProps {
  setAutosaved: (value: boolean) => void;
}

export default function Profile({ setAutosaved }: ProfileProps) {
  const user = useUserStore.use.data();
  const userDetails = useUserDetailsStore.use.data();

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
  });
  const formData = form.watch();
  const prevFormDataRef = useRef(formData);

  useQuery(userDetailsQueryOptions);

  const { mutate: mutateUserDetails } = useMutation({
    mutationFn: async (values: TProfileSchema) => {
      return profileMutationFn(values);
    },
    onSuccess: () => {
      setAutosaved(true);
    },
    onError: (err) => toast.error(err.message),
  });

  const debouncedSave = debounce((data: TProfileSchema) => {
    if (JSON.stringify(data) !== JSON.stringify(prevFormDataRef.current)) {
      mutateUserDetails(data);
      prevFormDataRef.current = data; // Update ref with current data
    }
  }, 1000);

  useEffect(() => {
    if (userDetails) {
      form.reset(userDetails);
      prevFormDataRef.current = userDetails;
    }
  }, [userDetails, form]);

  useEffect(() => {
    debouncedSave(formData);
    return () => debouncedSave.cancel();
  }, [formData, debouncedSave]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeletePicture = () => {
    console.log("Delete profile picture");
  };

  const handleChangePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { mutate: mutatePicture } = useMutation({
    mutationFn: async (file: File) => {
      return pictureMutationFn(file);
    },
    onSuccess: () => {
      toast.success("Profile Picture updated successful.");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleUploadPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      mutatePicture(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <div className="flex w-full gap-2 sm:w-60 sm:flex-col">
        <Avatar className="size-60 rounded-md border">
          <AvatarImage src={user?.profile_image} />
          <AvatarFallback className="size-60 rounded-none text-9xl">
            {user && user.username[0] + user.username[1]}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col justify-end gap-2">
          <Button
            variant="outline"
            className="border-primary text-primary"
            onClick={handleChangePicture}
          >
            Change
            <Input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleUploadPicture}
            />
          </Button>
          <Button variant="outline" onClick={handleDeletePicture}>
            Delete
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <div className="flex flex-wrap gap-3">
            <FormField
              control={form.control}
              name="display_name"
              label="Name"
              render={({ field }) => <Input {...field} placeholder="Name" />}
              className="w-full lg:w-80"
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
              className="w-full lg:w-80"
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Prefer Not to Say">
                        Prefer Not to Say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              className="w-full lg:w-80"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Address</p>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address_line_1"
                  render={({ field }) => (
                    <Input {...field} placeholder="Address Line 1" />
                  )}
                />
                <FormField
                  control={form.control}
                  name="address_line_2"
                  render={({ field }) => (
                    <Input {...field} placeholder="Address Line 2" />
                  )}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <Input {...field} placeholder="City, State" />
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <Input {...field} placeholder="Country" />
                  )}
                />
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <Input {...field} placeholder="ZipCode" />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Interests*</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-md border bg-white p-2 text-sm"
                >
                  {item}
                  <X className="size-4" />
                </div>
              ))}
            </div>
            <div className="rounded-md border p-3 text-xs">
              *Our smart bots learn what you love to keep things real and safe
              when connecting! <b>Want privacy?</b> Just cross off any interests
              you don't want to share!
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
