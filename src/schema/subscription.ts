import { z } from "zod";

export enum SUBSCRIPTION_PERIOD {
  MONTHLY = "monthly",
  ANNUAL = "annual",
}

export enum PAYMENT_METHOD {
  CARD = "creditCard",
  CASH_APP_CASH = "cash-app-pay",
  AFFIRM = "affirm",
  KLARNA = "klarna",
  AFTERPAY = "afterpay",
}

export const subscriptionSchema = z.object({
  period: z.enum([SUBSCRIPTION_PERIOD.MONTHLY, SUBSCRIPTION_PERIOD.ANNUAL]),
  paymentMethod: z.enum([
    PAYMENT_METHOD.CARD,
    PAYMENT_METHOD.CASH_APP_CASH,
    PAYMENT_METHOD.AFFIRM,
    PAYMENT_METHOD.KLARNA,
    PAYMENT_METHOD.AFTERPAY,
  ]),
});

export type TSubscriptionSchema = z.infer<typeof subscriptionSchema>;
