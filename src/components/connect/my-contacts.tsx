import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { myContactsQueryOptions } from "~/actions/contact/query-options";
import useContactStore from "~/store/connect/contact";

import ConnectAvatar, { ConnectAvatarSkeleton } from "./avatar";
import { ConnectSubHeader } from "./sub-header";

export const MyContacts = () => {
  const [showList, setShowList] = useState(false);
  const myContacts = useContactStore.use.data();
  const { isPending } = useQuery(myContactsQueryOptions);

  if (!myContacts || (!myContacts && isPending))
    return (
      <section>
        <ConnectSubHeader
          title="Address Book"
          showList={showList}
          setShowList={setShowList}
        />
        <div className="divide-y divide-dashed">
          <ConnectAvatarSkeleton />
          <ConnectAvatarSkeleton />
          <ConnectAvatarSkeleton />
        </div>
      </section>
    );

  return (
    <section>
      <ConnectSubHeader
        title="Address Book"
        showList={showList}
        setShowList={setShowList}
      />

      {showList ? (
        <div className="divide-y divide-dashed">
          {myContacts.map((contact) => (
            <div className="hover:bg-primary/5">
              <ConnectAvatar contact={contact} />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};
