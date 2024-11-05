import { queryOptions } from "@tanstack/react-query";

import { getMyContacts, getMyInteractions } from "./index";

export const myContactsQueryOptions = queryOptions({
  queryKey: ["my-contacts"],
  queryFn: getMyContacts,
});

export const myInteractionsQueryOptions = queryOptions({
  queryKey: ["my-interactions"],
  queryFn: getMyInteractions,
});
