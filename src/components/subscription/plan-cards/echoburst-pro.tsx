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

export default function EchoburstProPlan({ setPlan }: PlanProps) {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">
            Echoburst <br /> Pro
          </CardTitle>
          <CardDescription>Advanced</CardDescription>
        </CardHeader>
        <div className="absolute right-6 top-11 text-right">
          <p className="text-xl font-semibold text-primary">
            $5<span className="text-sm"> /month</span>
          </p>
          <p className="text-xs">
            or $50/year <br />
            for the first year.
          </p>
        </div>
        <CardContent>
          <p className="text-sm">
            Monetize, scale, and enhance their digital twin's capabilities.
          </p>
          <p className="mt-4 text-sm font-bold uppercase">Features</p>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Monetize your twin with low service charges based on revenue
              slabs.
            </li>
            <li>
              Set up recurring billing and paid memberships with flexible
              payment methods.
            </li>
            <li>Create and manage communities without restrictions.</li>

            <li>Enhanced AI capabilities and advanced group settings.</li>
            <li>
              Get early access and 24/7 Premium Support & Dedicated Account
              Manager.
            </li>
          </ul>
          <p className="mt-4 text-sm font-bold uppercase">Rewards</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Earn nuggets via streaks and engagement</li>
            <li>Become a SuperFan to earn more.</li>
            <li>Top-up using Flex for additional rate-limited services.</li>
            <li>Exchange nuggets with friends and family.</li>
          </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-4">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
          onClick={() => setPlan(PlanEnum.EchoburstPro)}
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
