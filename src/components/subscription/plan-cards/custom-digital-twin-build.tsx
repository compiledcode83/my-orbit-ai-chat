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
import { Separator } from "../../ui/separator";

interface PlanProps {
  setPlan: (plan: PlanEnum) => void;
}

export default function CustomDigitalTwinBuildPlan({ setPlan }: PlanProps) {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">
            Custom Digital
            <br /> Twin Build
          </CardTitle>
          <CardDescription>Pay as you go.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <p className="mt-4 text-sm font-bold uppercase">Standard</p>
            <p className="text-xl text-primary">$100</p>
          </div>
          <Separator className="my-2" />
          <ul className="list-disc pl-5 text-sm">
            <li>
              Guided onboarding and pre-configured templates for service twins.
            </li>
            <li>Overview of key analytics for the first week.</li>
          </ul>

          <div className="flex items-end justify-between">
            <p className="mt-4 text-sm font-bold uppercase">Advanced</p>
            <p className="text-xl text-primary">$50/hour</p>
          </div>
          <Separator className="my-2" />
          <ul className="list-disc pl-5 text-sm">
            <li>
              Access to custom features, and advanced visual and voice
              customization or integrate third-party tools.
            </li>
            <li>
              Get advanced training and priority support for team members.
            </li>
          </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-4">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
          onClick={() => setPlan(PlanEnum.CustomDigitalTwinBuild)}
        >
          Make an Order
        </Button>
      </CardFooter>
    </Card>
  );
}
