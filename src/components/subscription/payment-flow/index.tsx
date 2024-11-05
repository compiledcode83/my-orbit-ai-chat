import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft } from "lucide-react";

import { Separator } from "~/components/ui/separator";
import { PlanEnum } from "~/routes/_authed/subscription";

import BasePaymentFlow from "./base";
import FlexPaymentFlow from "./flex";
import GiftPaymentFlow from "./gift";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

interface PaymentFlowProps {
  plan: PlanEnum;
}

export default function PaymentFlow({ plan }: PaymentFlowProps) {
  return (
    <Elements stripe={stripePromise}>
      <div className="p-4">
        <div className="flex items-center">
          <ChevronLeft className="size-8" />
          <h3 className="text-2xl font-bold">Payment</h3>
        </div>
        <Separator className="my-2" />
        {plan === PlanEnum.Flex && <FlexPaymentFlow />}
        {plan === PlanEnum.Base && <BasePaymentFlow />}
        {plan === PlanEnum.Gift && <GiftPaymentFlow />}
      </div>
    </Elements>
  );
}
