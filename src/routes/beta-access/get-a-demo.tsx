import { createFileRoute } from "@tanstack/react-router";

import GetADemoForm from "~/components/auth/get-a-demo-form";

export const Route = createFileRoute("/beta-access/get-a-demo")({
  component: () => {
    return (
      <main className="p-4 min-h-screen w-screen flex justify-center items-center">
        <GetADemoForm />
      </main>
    );
  },
});
