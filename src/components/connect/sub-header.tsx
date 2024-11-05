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
      <div className="flex w-full items-center">
        <h5>{title}</h5>

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={handleShowList}
        >
          {showList ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
        </Button>
      </div>
    </>
  );
};
