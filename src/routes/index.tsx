import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const Quotation = () => (
  <svg
    width="70"
    height="65"
    viewBox="0 0 107 85"
    fill="none"
    className="absolute -top-[40px] left-0 -z-[1]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M42.7598 85H0V42.4005C0 17.3848 14.2533 3.25136 42.7598 0V21.2998C28.975 21.7642 21.8149 28.7978 21.2796 42.4005H42.7598V85ZM107 85H64.2402V42.4005C64.2402 17.3848 78.4934 3.25136 107 0V21.2998C93.2151 21.7642 86.055 28.7978 85.5197 42.4005H107V85Z"
      fill="#EAEDFF"
    />
  </svg>
);

function HomeComponent() {
  return (
    <main className="h-screen w-dvw grid grid-cols-12">
      <img
        className="z-20 absolute left-5 top-5"
        src="/assets/logos/logo.svg"
        alt="MyOrbitAi"
      />

      <img
        className="col-span-4 object-cover object-center h-screen"
        src="/assets/banners/login-desktop.png"
        alt=""
      />

      <section className="overflow-y-scroll col-span-8 grid grid-cols-8 p-14">
        <div className="size-full flex flex-col col-span-6 items-start gap-y-7 justify-center">
          <div className="relative">
            <Quotation />
            <h1 className="text-[#070707] font-extralight tracking-[2%] text-7xl">
              Reimagine Everything.
            </h1>
          </div>

          <h3 className="text-[#7D7D7D] text-2xl font-semibold">
            Welcome to <span className="text-primary">myOrbit Beta</span>
          </h3>

          <p className="font-medium text-[#202020]">
            We invite you to share your insights and feedback as we work to
            bring companionship and connection to the world. Finding your orbit
            could never be easier!
          </p>

          <div className="font-medium text-[#202020] space-y-2">
            <p>For feedback, write to us at</p>
            <Link
              href="mailto:info@myorbit.ai"
              className="text-[24px] tracking-[2%] font-semibold text-[#070707]"
              target="_blank"
            >
              info@myorbit.ai
            </Link>
          </div>

          <div className="space-y-2">
            <Link
              href="/beta-access/get-a-demo"
              className={cn(buttonVariants({ size: "lg" }), "gap-x-2 w-full")}
            >
              Let’s Do It! <ArrowRight className="size-5" />
            </Link>

            <div className="flex items-center">
              <Label htmlFor="signin-button" className="">
                Have an Account?
              </Label>

              <Link
                id="signin-button"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "px-1",
                })}
                href="/signin"
              >
                Sign In
              </Link>
            </div>
          </div>

          <p className="text-sm text-zinc-500">
            *Please note that the contents of this platform are confidential. We
            ask that you do not disclose any details to unauthorized
            individuals.
          </p>
        </div>

        <div className="flex justify-between col-span-8 mt-auto items-center">
          <div className="">
            By continuing, you agree to our{" "}
            <Link href="/legal/terms-of-service">
              <span className="underline text-[#378FDF]">
                Terms & Conditions
              </span>
            </Link>{" "}
            and{" "}
            <Link
              className="text-[#378FDF] underline"
              href="/legal/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="dark:text-gray-600">Copyright @ myOrbit 2024</div>
        </div>
      </section>
    </main>
  );
}
