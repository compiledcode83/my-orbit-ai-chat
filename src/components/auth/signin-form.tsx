import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInMutationFn } from "~/actions/auth/signin";
import { TSignInSchema, signInSchema } from "~/schema/auth";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { PasswordInput } from "../ui/password-input";
import { PhoneInput } from "../ui/phone-input";
import { getTimezone } from "~/lib/utils";
import { signIn } from "~/store/persist-storage/user";

export default function SignInForm() {
  const navigate = useNavigate();
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: TSignInSchema) => {
      const timezone = await getTimezone();
      return signInMutationFn({
        username: values.email || values.phone || "",
        password: values.password,
        timezone,
      });
    },
    onSuccess: ({ data, message }) => {
      signIn(data);
      navigate({ to: "/chat/my-orbit", replace: true });
      toast.success(message);
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (values: TSignInSchema) => {
    return mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <div>
          <FormField
            control={form.control}
            name="email"
            label="Email"
            render={({ field }) => <Input {...field} />}
          />

          <div className="mt-2 flex items-center justify-between gap-x-2">
            <Separator className="w-[calc(50%_-_1rem)]" />
            <p className="text-muted-foreground">or</p>
            <Separator className="w-[calc(50%_-_1rem)]" />
          </div>

          <FormField
            control={form.control}
            name="phone"
            label="Phone"
            render={({ field }) => <PhoneInput {...field} />}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          label="Password"
          render={({ field }) => <PasswordInput {...field} />}
        />

        <Button
          loading={isPending}
          disabled={isPending}
          type="submit"
          className="w-full mt-4"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}
