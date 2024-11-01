import { BookOpenText, HeartIcon, Link, Share2Icon } from "lucide-react";

import { Card } from "../ui/card";

export default function Feed() {
  return (
    <Card className="col-span-1 mt-8 overflow-hidden rounded-b-3xl border border-[#D8D7E0] border-t-transparent">
      <div className="relative">
        <p className="absolute left-5 top-6 rounded-full bg-black px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white">
          Animal
        </p>
        <img src="/assets/feed/sample-img.png" alt="sample-img" />
        <div className="absolute bottom-5 left-6 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-x-1 font-inter text-[10px] text-[#D8D7E0]">
              <BookOpenText height={15} width={11} />
              42 min read
            </div>
            <p className="text-2xl text-white">
              9 Top Blue Parrot <br /> Species to Keep as Pets
            </p>
          </div>
          <p className="flex items-center gap-x-2 font-inter text-[10px] text-[#D8D7E0]">
            <Link size={12} />
            thesprucepets.com, source2.com, +2 more
          </p>
        </div>
      </div>
      <div className="flex space-x-5 p-5">
        <HeartIcon size={24} />
        <Share2Icon size={24} />
      </div>
    </Card>
  );
}
