import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { myInteractionsQueryOptions } from "~/actions/contact/query-options";
import useInteractionContactsStore from "~/store/connect/interactions";

import ConnectAvatar from "./avatar";
import { ConnectSubHeader } from "./sub-header";

export const MyInteractions = () => {
  const [showList, setShowList] = useState(false);
  const myInteractions = useInteractionContactsStore.use.data();
  const { isPending } = useQuery(myInteractionsQueryOptions);

  if (!myInteractions || (!myInteractions && isPending)) return;

  return (
    <section>
      <ConnectSubHeader
        title="Interactions"
        showList={showList}
        setShowList={setShowList}
      />

      {showList ? (
        <div className="divide-y divide-dashed">
          {myInteractions.map((contact) => (
            <div className="hover:bg-primary/5">
              <ConnectAvatar contact={contact} />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};