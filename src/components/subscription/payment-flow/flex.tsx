import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { PAYMENT_METHOD } from "~/schema/subscription";

import PaymentMethodForm from "./payment-method-form";

const CURRENT_BALANCE = 2000;
export const PRICE_PER_NUGGET = 40; // Need to be stored in separate file.

const PURCHASE_CHOICES = [1, 2, 5, 7, 10];

enum PURCHASE_STEP {
  ChooseAmount = "ChooseAmount",
  ChoosePaymentMethod = "ChoosePaymentMethod",
}

export default function FlexPaymentFlow() {
  const [nuggetAmount, setNuggetAmount] = useState<number>(1);
  const [purchaseStep, setPurchaseStep] = useState<PURCHASE_STEP>(
    PURCHASE_STEP.ChooseAmount,
  );
  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD>(
    PAYMENT_METHOD.CARD,
  );

  const ChooseAmountStep = () => (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <p className="text-sm font-semibold">Chosen Plan</p>
          <p className="text-xl font-bold"> Flex</p>
        </div>
        <div className="text-end">
          <p className="text-xl font-semibold text-primary">${nuggetAmount}</p>
          <p className="text-xs">
            Chosen <br /> Amount
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <p className="text-sm font-semibold"> Your Available Nuggets</p>
      <div className="my-2 flex gap-2">
        <img src={"/assets/nugget.svg"} height={12} width={10} />
        <p className="text-sm font-semibold">{CURRENT_BALANCE}</p>
      </div>
      <Separator className="my-4" />

      <p className="my-4 text-sm font-semibold">Pick an amount to buy</p>

      <RadioGroup
        value={String(nuggetAmount)}
        onValueChange={(val) => setNuggetAmount(Number(val))}
      >
        {PURCHASE_CHOICES.map((price) => (
          <Label
            key={price}
            htmlFor={String(price)}
            className="flex cursor-pointer items-center space-x-2 rounded-md border px-6 py-3"
          >
            <RadioGroupItem value={String(price)} id={String(price)} />
            <p className="text-sm font-medium">
              ${price} for {PRICE_PER_NUGGET * price} Nuggets
            </p>
          </Label>
        ))}
      </RadioGroup>

      <p className="mb-4 mt-8 text-sm font-semibold">Your new balance</p>
      <div className="my-2 flex gap-2">
        <img src={"/assets/nugget.svg"} height={12} width={10} />
        <p className="text-sm font-semibold">
          {CURRENT_BALANCE + PRICE_PER_NUGGET * nuggetAmount}
        </p>
      </div>
    </>
  );

  const PaymentStep = () => (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <p className="text-xs font-semibold">You are purchasing</p>
          <div className="my-2 flex gap-2">
            <img
              src={"/assets/nugget.svg"}
              height={18}
              width={14}
              alt="nugget"
            />
            <p className="font-bold">{nuggetAmount * PRICE_PER_NUGGET}</p>
          </div>
        </div>
        <div className="text-end">
          <p className="text-xl font-semibold text-primary">${nuggetAmount}</p>
        </div>
      </div>
      <PaymentMethodForm
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </>
  );

  const handleProceedClick = () => {
    if (purchaseStep === PURCHASE_STEP.ChooseAmount) {
      setPurchaseStep(PURCHASE_STEP.ChoosePaymentMethod);
    } else if (purchaseStep === PURCHASE_STEP.ChoosePaymentMethod) {
      console.log("proceed payment");
    }
  };

  const handleCancelClick = () => {
    if (purchaseStep === PURCHASE_STEP.ChoosePaymentMethod) {
      setPurchaseStep(PURCHASE_STEP.ChooseAmount);
    }
  };

  return (
    <>
      {purchaseStep === PURCHASE_STEP.ChooseAmount && <ChooseAmountStep />}
      {purchaseStep === PURCHASE_STEP.ChoosePaymentMethod && <PaymentStep />}

      <Button onClick={handleProceedClick} className="my-2 w-full">
        Proceed with Payment
      </Button>
      <Button
        onClick={handleCancelClick}
        variant="outline"
        className="w-full text-primary"
      >
        {purchaseStep === PURCHASE_STEP.ChooseAmount ? "Cancel" : "Back"}
      </Button>
    </>
  );
}
