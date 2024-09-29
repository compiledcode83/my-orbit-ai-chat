import { createFileRoute } from "@tanstack/react-router";

import GetADemoForm from "~/components/auth/get-a-demo-form";

export const Route = createFileRoute("/beta-access/get-a-demo")({
  component: () => {
    return (
      <main className="flex min-h-screen w-screen items-center justify-center p-4">
        <GetADemoForm />
      </main>
    );
  },
});
