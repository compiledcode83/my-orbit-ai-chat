import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { AtSign, CircleCheck, Link2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { accountMutationFn } from "~/actions/settings/account";
import { UserInterface, userSchema } from "~/schema/user";
import useUserStore from "~/store/persist-storage/user";

import { Button } from "../../ui/button";
import { Form, FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import ChangePassword from "./change-password";

interface AccountProps {
  setAutosaved: (value: boolean) => void;
}

export default function Account({ setAutosaved }: AccountProps) {
  const account = useUserStore.use.data();

  const form = useForm<UserInterface>({
    resolver: zodResolver(userSchema),
  });
  const formData = form.watch();
  const prevFormDataRef = useRef(formData);

  const { mutate } = useMutation({
    mutationFn: async (values: UserInterface) => {
      return accountMutationFn(values);
    },
    onSuccess: () => {
      setAutosaved(true);
    },
    onError: (err) => toast.error(err.message),
  });

  const debouncedSave = debounce((data: UserInterface) => {
    if (JSON.stringify(data) !== JSON.stringify(prevFormDataRef.current)) {
      mutate(data);
      prevFormDataRef.current = data;
    }
  }, 1000);

  useEffect(() => {
    if (account) {
      form.reset(account);
      prevFormDataRef.current = account;
    }
  }, [account, form]);

  useEffect(() => {
    debouncedSave(formData);
    return () => debouncedSave.cancel();
  }, [formData, debouncedSave]);

  return (
    <div>
      <Form {...form}>
        <div className="my-4 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-end">
          <FormField
            control={form.control}
            name="user_id"
            label="Username"
            render={({ field }) => (
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform" />
                <Input {...field} placeholder="Username" className="pl-8" />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            label="E-Mail"
            render={({ field }) => <Input {...field} placeholder="E-Mail" />}
          />
          <FormField
            control={form.control}
            name="mobile"
            label="Phone Number"
            render={({ field }) => (
              <Input {...field} placeholder="Phone Number" />
            )}
          />
          <ChangePassword />
        </div>
      </Form>
      <p className="mb-2 text-base font-medium">Linked Accounts</p>
      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        <Button
          variant="outline"
          className="flex h-12 w-full justify-between gap-2 sm:w-80"
        >
          <img src={"/assets/icons/settings/google.svg"} />
          <div className="flex items-center gap-2 rounded-full border border-none bg-primary-foreground px-4 py-1 text-primary">
            <CircleCheck className="size-5" />
            Linked
          </div>
        </Button>
        <div className="flex gap-2">
          <div className="flex size-12 items-center justify-center rounded-md border bg-white">
            <img src={"/assets/icons/settings/apple.svg"} />
          </div>
          <Button
            variant="outline"
            className="h-12 w-[calc(100%-56px)] justify-between sm:w-72"
          >
            Link Apple ID
            <Link2 className="size-6" />
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="flex size-12 items-center justify-center rounded-md border bg-white">
            <img src={"/assets/icons/settings/facebook.svg"} />
          </div>
          <Button
            variant="outline"
            className="h-12 w-[calc(100%-56px)] justify-between sm:w-72"
          >
            Link Facebook
            <Link2 className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
