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

export default function EchoburstEssentialsPlan({ setPlan }: PlanProps) {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">
            Echoburst
            <br /> Essentials
          </CardTitle>
          <CardDescription>Base</CardDescription>
        </CardHeader>
        <div className="absolute right-6 top-11">
          <p className="text-xl font-bold text-green-400">Always Free</p>
        </div>
        <CardContent>
          <p className="text-sm">
            Get started with your digital twin journey for business.
          </p>
          <p className="mt-4 text-sm font-bold uppercase">Features</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Simple ad management with $10 worth of Adcredits.</li>
            <li>
              Create upto 3 groups, with a max capacity of 50 each for community
              management.
            </li>
            <li>
              Get access to core AI capabilities including multilingual customer
              support, preset voices, and image recognition.
            </li>
          </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-4">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
          onClick={() => setPlan(PlanEnum.EchoburstEssentials)}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
