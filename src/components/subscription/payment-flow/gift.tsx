import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { PAYMENT_METHOD } from "~/schema/subscription";

import { PRICE_PER_NUGGET } from "./flex";
import PaymentMethodForm from "./payment-method-form";

// TODO: to replace with likely User interface
type Friend = {
  user_id: string;
  profile_image: string;
  name: string;
};

// Mock data
// TODO: needs to be replaced by API calls.
const friends: Friend[] = [
  {
    user_id: "user_id_1",
    profile_image:
      "https://intellecto-media-storage.s3.amazonaws.com/Profile_photos/841763b7-2db2-4749-9b9b-3a4cc081714c.jpg?AWSAccessKeyId=AKIAQEE5SIIGRE2OFO65&Signature=u%2FUOosuD1PBkcJgsTy31yGFAdiI%3D&Expires=1730756511",
    name: "Sophie Myers",
  },
  {
    user_id: "user_id_2",
    profile_image: "",
    name: "Brendan White",
  },
  {
    user_id: "user_id_3",
    profile_image: "",
    name: "Sartaj Singh",
  },
  {
    user_id: "user_id_4",
    profile_image: "",
    name: "Sudarsh Jain",
  },
  {
    user_id: "user_id_5",
    profile_image: "",
    name: "Sanjeevani Pandey",
  },
];

enum GIFT_STEP {
  ChoosePerson = "ChoosePerson",
  ChooseAmount = "ChooseAmount",
  ChoosePaymentMethod = "ChoosePaymentMethod",
}

const PURCHASE_CHOICES = [10, 20, 50, 100];

export default function GiftPaymentFlow() {
  const [giftStep, setGiftStep] = useState<GIFT_STEP>(GIFT_STEP.ChoosePerson);
  const [nuggetAmount, setNuggetAmount] = useState<number>(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>(friends);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [selectedFriend, setSelectedFriend] = useState<Friend>();

  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD>(
    PAYMENT_METHOD.CARD,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search term
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = friends.filter((friend) =>
        friend.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredFriends(filtered);
    } else {
      setFilteredFriends(friends);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [filteredFriends]);

  const handleProceedClick = () => {
    if (giftStep === GIFT_STEP.ChoosePerson) {
      setGiftStep(GIFT_STEP.ChooseAmount);
    } else if (giftStep === GIFT_STEP.ChooseAmount) {
      setGiftStep(GIFT_STEP.ChoosePaymentMethod);
    } else if (giftStep === GIFT_STEP.ChoosePaymentMethod) {
      console.log("proceed payment");
    }
  };

  const handleCancelClick = () => {
    if (giftStep === GIFT_STEP.ChooseAmount) {
      setGiftStep(GIFT_STEP.ChoosePerson);
    } else if (giftStep === GIFT_STEP.ChoosePaymentMethod) {
      setGiftStep(GIFT_STEP.ChooseAmount);
    }
  };

  const ChoosePersonStep = () => (
    <>
      <p className="mt-8 font-semibold">Choose Person</p>
      <Separator className="my-2" />

      <p className="mt-4 text-sm font-semibold uppercase">Address Book</p>
      <div className="relative my-2">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Find Connections"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          ref={inputRef}
        />
      </div>

      <RadioGroup
        value={selectedFriend?.user_id}
        onValueChange={(val) =>
          setSelectedFriend(friends.find((f) => f.user_id === val))
        }
      >
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <Label
              key={friend.user_id}
              htmlFor={friend.user_id}
              className="flex cursor-pointer items-center justify-between rounded-md border px-6 py-3"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarImage src={friend.profile_image} />
                  <AvatarFallback>
                    <img src="/assets/profile.png" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{friend.name}</p>
              </div>
              <RadioGroupItem value={friend.user_id} id={friend.user_id} />
            </Label>
          ))
        ) : (
          <div className="my-2 text-sm">No friends found</div>
        )}
      </RadioGroup>
    </>
  );

  const ChooseAmountStep = () => (
    <>
      <p>Sharing with</p>
      <Separator className="my-2" />

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={selectedFriend?.profile_image} />
            <AvatarFallback>
              <img src="/assets/profile.png" />
            </AvatarFallback>
          </Avatar>
          <p>{selectedFriend?.name}</p>
        </div>
        <p
          className="cursor-pointer uppercase text-primary"
          onClick={() => setGiftStep(GIFT_STEP.ChoosePerson)}
        >
          Change
        </p>
      </div>

      <Separator className="my-2" />
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
    </>
  );

  const ChoosePaymentMethodStep = () => (
    <>
      <p>Sharing with</p>
      <Separator className="my-2" />

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={selectedFriend?.profile_image} />
            <AvatarFallback>
              <img src="/assets/profile.png" />
            </AvatarFallback>
          </Avatar>
          <p>{selectedFriend?.name}</p>
        </div>
        <div className="my-2 flex gap-2">
          <img src={"/assets/nugget.svg"} height={12} width={10} />
          <p className="text-sm font-semibold">
            {nuggetAmount * PRICE_PER_NUGGET}
          </p>
        </div>
      </div>

      <PaymentMethodForm
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </>
  );

  return (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <p className="text-sm font-semibold">Chosen Plan</p>
          <p className="text-xl font-bold"> Flex</p>
        </div>
        {giftStep !== GIFT_STEP.ChoosePerson && (
          <div className="text-end">
            <p className="text-xl font-semibold text-primary">
              ${nuggetAmount}
            </p>
            <p className="text-xs">
              Chosen <br /> Amount
            </p>
          </div>
        )}
      </div>
      {giftStep === GIFT_STEP.ChoosePerson && <ChoosePersonStep />}
      {giftStep === GIFT_STEP.ChooseAmount && <ChooseAmountStep />}
      {giftStep === GIFT_STEP.ChoosePaymentMethod && (
        <ChoosePaymentMethodStep />
      )}

      <Button onClick={handleProceedClick} className="my-2 w-full">
        Choose Amount Next
      </Button>
      <Button
        onClick={handleCancelClick}
        variant="outline"
        className="w-full text-primary"
      >
        {giftStep === GIFT_STEP.ChoosePerson ? "Cancel" : "Back"}
      </Button>
    </>
  );
}
