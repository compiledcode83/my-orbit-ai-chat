import { Eye, EyeOff } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { Button } from "../ui/button";

interface Props {
  title: string;
  showList: boolean;
  setShowList: Dispatch<SetStateAction<boolean>>;
}

export const ConnectSubHeader = ({ title, showList, setShowList }: Props) => {
  const handleShowList = () => setShowList((prev) => !prev);

  return (
    <>
      <div className="flex w-full items-center gap-x-1">
        <h5>{title}</h5>

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={handleShowList}
        >
          {showList ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </Button>
      </div>
    </>
  );
};
