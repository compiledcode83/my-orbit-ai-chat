import { UserInterface } from "~/schema/user";

export const accountMutationFn = async (data: UserInterface) => {
  console.log("Update account info", data);
};
