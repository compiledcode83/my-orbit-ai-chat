/* eslint-disable react-hooks/rules-of-hooks */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import PaymentFlow from "~/components/subscription/payment-flow";
import BasePlan from "~/components/subscription/plan-cards/base";
import CustomDigitalTwinBuildPlan from "~/components/subscription/plan-cards/custom-digital-twin-build";
import DefaultPlan from "~/components/subscription/plan-cards/default";
import EchoburstEssentialsPlan from "~/components/subscription/plan-cards/echoburst-essentials";
import EchoburstProPlan from "~/components/subscription/plan-cards/echoburst-pro";
import FlexPlan from "~/components/subscription/plan-cards/flex";
import GiftPlan from "~/components/subscription/plan-cards/gift";
import PremiumPlan from "~/components/subscription/plan-cards/premium";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export enum PlanEnum {
  Flex = "flex",
  Gift = "gift",
  Base = "base",
  Premium = "premium",
  EchoburstEssentials = "echoburst-essentials",
  EchoburstPro = "echoburst-pro",
  CustomDigitalTwinBuild = "custom-digital-twin-build",
}

export const Route = createFileRoute("/_authed/subscription/")({
  component: () => {
    const [plan, setPlan] = useState<PlanEnum>();

    return (
      <div className="flex">
        <div className="xl:w-2/3 2xl:w-3/4">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-6">
              <h3 className="items-center text-4xl font-semibold tracking-tight">
                Account Settings
              </h3>
            </div>
            <div className="mr-4 flex flex-col gap-2 p-0 text-right">
              <p className="text-xs font-bold uppercase text-primary">
                Exchange rate
              </p>
              <p className="text-xl">$ 1 = 40 Nuggets</p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="grid xl:grid-cols-2 2xl:grid-cols-3">
            <Card className="flex items-center justify-center rounded-none">
              <p>(Promotional Image)</p>
            </Card>
            <DefaultPlan />
            <FlexPlan setPlan={setPlan} />
            <GiftPlan setPlan={setPlan} />
            <BasePlan setPlan={setPlan} />
            <PremiumPlan setPlan={setPlan} />
          </div>
          <Separator className="my-2" />
          <h3 className="mt-10 items-center text-4xl font-semibold tracking-tight">
            Plans for Business
          </h3>
          <Separator className="my-2" />
          <div className="grid xl:grid-cols-2 2xl:grid-cols-3">
            <EchoburstEssentialsPlan setPlan={setPlan} />
            <EchoburstProPlan setPlan={setPlan} />
            <CustomDigitalTwinBuildPlan setPlan={setPlan} />
          </div>
        </div>
        <div className="border-l xl:w-1/3 2xl:w-1/4">
          {plan && <PaymentFlow plan={plan} />}
        </div>
      </div>
    );
  },
});
