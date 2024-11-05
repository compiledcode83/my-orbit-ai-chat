import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";

import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { PAYMENT_METHOD } from "~/schema/subscription";

interface PaymentMethodFormProps {
  paymentMethod: PAYMENT_METHOD;
  setPaymentMethod: (val: PAYMENT_METHOD) => void;
}

export default function PaymentMethodForm({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodFormProps) {
  return (
    <>
      <p className="mt-8 font-semibold">Choose Payment Method</p>
      <Separator className="my-2" />
      <RadioGroup
        value={paymentMethod}
        onValueChange={(val: PAYMENT_METHOD) => setPaymentMethod(val)}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PAYMENT_METHOD.CARD} id="card" />
          <Label
            htmlFor="card"
            className="flex w-[calc(100%-24px)] items-center justify-between"
          >
            Card
            <CreditCard />
          </Label>
        </div>
        {paymentMethod === PAYMENT_METHOD.CARD && (
          <>
            {/* <CardElement /> */}
            <CardCvcElement />
            <CardExpiryElement />
            <CardNumberElement />
          </>
        )}
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={PAYMENT_METHOD.CASH_APP_CASH}
            id="cash-app-pay"
          />
          <Label
            htmlFor="cash-app-pay"
            className="flex w-[calc(100%-24px)] items-center justify-between"
          >
            Cash App Pay
            <CreditCard />
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PAYMENT_METHOD.AFFIRM} id="affirm" />
          <Label
            htmlFor="affirm"
            className="flex w-[calc(100%-24px)] items-center justify-between"
          >
            Affirm
            <CreditCard />
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PAYMENT_METHOD.KLARNA} id="klarna" />
          <Label
            htmlFor="klarna"
            className="flex w-[calc(100%-24px)] items-center justify-between"
          >
            Klarna
            <CreditCard />
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PAYMENT_METHOD.AFTERPAY} id="afterpay" />
          <Label
            htmlFor="afterpay"
            className="flex w-[calc(100%-24px)] items-center justify-between"
          >
            Afterpay
            <CreditCard />
          </Label>
        </div>
      </RadioGroup>
    </>
  );
}
