import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { changePasswordMutationFn } from "~/actions/auth/change-password";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { TUpdatePasswordSchema, updatePasswordSchema } from "~/schema/settings";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);

  const form = useForm<TUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (values: TUpdatePasswordSchema) => {
      return changePasswordMutationFn(values);
    },
    onSuccess: () => {
      toast.success("Success");
      setOpen(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data: TUpdatePasswordSchema) => {
    mutate(data);
  };

  useEffect(() => {
    form.reset();
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Use a strong password with numbers, letters, and special characters.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 pt-0"
          >
            <FormField
              control={form.control}
              name="oldPasscode"
              label="Current Password"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Current Password"
                  type="password"
                />
              )}
            />
            <FormField
              control={form.control}
              name="newPasscode"
              label="New Password"
              render={({ field }) => (
                <Input {...field} placeholder="New Password" type="password" />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPasscode"
              label="Confirm Password"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Confirm Password"
                  type="password"
                />
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" className="mt-12 w-80">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
