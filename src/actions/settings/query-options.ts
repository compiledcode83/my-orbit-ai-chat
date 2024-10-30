import { queryOptions } from "@tanstack/react-query";

import { getUserDetails } from "./profile";

export const userDetailsQueryOptions = queryOptions({
  queryKey: ["user-details"],
  queryFn: getUserDetails,
});
