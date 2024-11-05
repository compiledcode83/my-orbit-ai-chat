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

export default function GiftPlan({ setPlan }: PlanProps) {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">Gift</CardTitle>
          <CardDescription>Shared with loved ones.</CardDescription>
        </CardHeader>
        <div className="absolute right-6 top-11">
          <p className="text-xs">Starts with</p>
          <p className="text-xl font-semibold text-primary">$10</p>
        </div>
        <CardContent>
          <p className="mt-4 text-sm font-bold uppercase">Features</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Share nuggets through a purchase.</li>
            <li>Nuggets shared through gifts do not expire.</li>
          </ul>
          <p className="mt-4 text-sm font-bold uppercase">Price options</p>
          <p className="text-sm">Make purchases in denominations of:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>$10, $20, $50, $100</li>
          </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-4">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
          onClick={() => setPlan(PlanEnum.Gift)}
        >
          Gift Nuggets
        </Button>
      </CardFooter>
    </Card>
  );
}
