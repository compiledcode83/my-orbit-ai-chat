import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export default function DefaultPlan() {
  return (
    <Card className="relative flex flex-col justify-between gap-4 rounded-none pt-3">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">Default</CardTitle>
        </CardHeader>
        <div className="absolute right-6 top-11">
          <p className="text-xl font-bold text-green-400">Always Free</p>
        </div>
        <CardContent>
          <p className="mt-4 text-sm font-bold uppercase">Features</p>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Uniterrupted, unlimited chat with friends, avatars, and twins.
            </li>
            <li>Unlimited voice/video calls with people.</li>
            <li>
              Voice/video calls with avatars and twins charged at the standard
              nuggets/min rate.
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
        <Button className="w-full" disabled>
          Current Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
