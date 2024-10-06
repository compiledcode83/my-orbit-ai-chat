import { createFileRoute } from "@tanstack/react-router";

import SignInForm from "~/components/auth/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/_logged-out/signin")({
  component: () => (
    <main className="flex h-screen w-dvw flex-col items-center justify-center pt-5">
      <img
        className="fixed left-5 top-5 z-20 size-12 md:size-20"
        src="/assets/logos/logo.svg"
        alt="MyOrbitAi"
      />

      <div className="relative flex flex-col justify-center rounded-md p-2">
        <Card className="max-w-2xl border-none shadow-none">
          <CardHeader>
            <CardTitle>
              <h2>Just About There!</h2>
            </CardTitle>

            <CardDescription className="text-base">
              Before we take you to your Orbit, we have to make sure you land
              onto the right space.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignInForm />
          </CardContent>

          <CardFooter>
            <CardDescription>
              By continuing, you agree to our {/* <Link */}
              {/*   to="/legal/terms-of-service" */}
              {/*   className={cn( */}
              {/*     buttonVariants({ variant: "link", size: "sm" }), */}
              {/*     "px-0", */}
              {/*   )} */}
              {/* > */}
              {/*   Terms & Conditions */}
              {/* </Link>{" "} */}
              {/* and{" "} */}
              {/* <Link */}
              {/*   to="/legal/privacy-policy" */}
              {/*   className={cn( */}
              {/*     buttonVariants({ variant: "link", size: "sm" }), */}
              {/*     "px-0", */}
              {/*   )} */}
              {/* > */}
              {/*   Privacy Policy */}
              {/* </Link> */}
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  ),
});
