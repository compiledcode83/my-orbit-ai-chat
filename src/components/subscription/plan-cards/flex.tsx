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

export default function FlexPlan({ setPlan }: PlanProps) {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">Flex</CardTitle>
          <CardDescription>Pay as you go.</CardDescription>
        </CardHeader>
        <div className="absolute right-6 top-11 text-right">
          <p className="text-xs">Starts with</p>
          <p className="text-xl font-semibold text-primary">$1</p>
        </div>
        <CardContent>
          <p className="mt-4 text-sm font-bold uppercase">Features</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Make one-time nugget purchases.</li>
            <li>No expiry for purchased nuggets.</li>
            <li>Pay as you go.</li>
          </ul>
          <p className="mt-4 text-sm font-bold uppercase">Price options</p>
          <p className="text-sm">Make purchases in denominations of:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>$1, $2, $3, $4, $5, $7</li>
            <li>$10, $20, $50, $100, $200</li>
          </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-4">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
          onClick={() => setPlan(PlanEnum.Flex)}
        >
          Buy Nuggets
        </Button>
      </CardFooter>
    </Card>
  );
}
