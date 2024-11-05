import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { PAYMENT_METHOD, SUBSCRIPTION_PERIOD } from "~/schema/subscription";

import PaymentMethodForm from "./payment-method-form";

export default function BasePaymentFlow() {
  const [period, setPeriod] = useState<SUBSCRIPTION_PERIOD>(
    SUBSCRIPTION_PERIOD.MONTHLY,
  );
  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD>(
    PAYMENT_METHOD.CARD,
  );

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    console.log("pm:", pm);

    if (error) {
      console.log(error.message);
    } else {
      // Handle successful payment method creation
      console.log("Payment Method created:", pm);

      // await fetch('/api/create-subscription', {
      //   method: 'POST',
      //   body: JSON.stringify({ paymentMethodId: pm.id, subscriptionPeriod }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
    }
  };

  return (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <p className="text-sm font-semibold">Chosen Plan</p>
          <p className="text-xl font-bold"> Base</p>
        </div>
        <div className="text-end">
          <p className="text-xl font-semibold text-primary">$29.99</p>
          <p className="text-xs">
            $25/month <br /> (billed annually)
          </p>
        </div>
      </div>

      <RadioGroup
        value={period}
        onValueChange={(val: SUBSCRIPTION_PERIOD) => setPeriod(val)}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={SUBSCRIPTION_PERIOD.MONTHLY} id="monthly" />
          <Label htmlFor="monthly">Monthly ($29,99.month)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={SUBSCRIPTION_PERIOD.ANNUAL} id="annual" />
          <Label htmlFor="annual">Annual ($300/year)</Label>
        </div>
      </RadioGroup>

      <PaymentMethodForm
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <Separator className="my-4" />
      <p className="text-xs font-normal">
        *All monthly subscription plans run from the 1st day of the month to the
        last day of the month. You will be billed from the date you join,
        ensuring you only pay for the portion of the month remaining.
      </p>

      <Button onChange={onSubmit} className="my-2 w-full">
        Proceed with Payment
      </Button>
      <Button variant="outline" className="w-full text-primary">
        Cancel
      </Button>
    </>
  );
}
