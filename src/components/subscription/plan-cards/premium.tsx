import { PlanEnum } from "~/routes/_authed/subscription";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

interface PlanProps {
  setPlan: (plan: PlanEnum) => void;
}

export default function PremiumPlan({ setPlan }: PlanProps) {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">Premium</CardTitle>
          <CardDescription>No ads.</CardDescription>
        </CardHeader>
        <div className="absolute right-6 top-11 text-right">
          <p className="text-xl font-semibold text-primary">
            $59.99<span className="text-sm"> /month</span>
          </p>
          <p className="text-xs">
            $50/month <br /> (billed annually)
          </p>
        </div>
        <CardContent>
          <p className="mt-4 text-sm font-bold uppercase">Features</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Get 3500 Nuggets every month.</li>
            <li>Completely ad-free experience.</li>
            <li>Unused nuggets expire at the end of the month</li>
            <li>Get additional nuggets at premium plan rates.</li>
          </ul>
          <p className="mt-4 text-sm font-bold uppercase">
            Added benefits with annual
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li>Get an additional 500 Nuggets each month.</li>
            <li>Unused nuggets will roll over with the annual plan.</li>
          </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-4">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
          onClick={() => setPlan(PlanEnum.Premium)}
        >
          Get Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
