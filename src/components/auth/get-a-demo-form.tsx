import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Form, FormField } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TGetADemoSchema, getADemoSchema } from "~/schema/auth";
import { useMutation } from "@tanstack/react-query";
import { betaAccessMutationFn } from "~/actions/auth/add-beta-user";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export default function GetADemoForm() {
  const navigate = useNavigate();
  const form = useForm<TGetADemoSchema>({
    resolver: zodResolver(getADemoSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: betaAccessMutationFn,
    onSuccess: ({ data }) => {
      navigate({ to: "/signin", replace: true });
      toast.success(data, { duration: 5000 });
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (values: TGetADemoSchema) => {
    return mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Get Beta Access</CardTitle>
            <CardDescription>
              Be among the first to try our exciting new product!
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              label="Name"
              render={({ field }) => <Input {...field} />}
            />
            <FormField
              control={form.control}
              name="email"
              label="Email"
              render={({ field }) => <Input {...field} />}
            />
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              loading={isPending}
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              Request Beta Access
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
