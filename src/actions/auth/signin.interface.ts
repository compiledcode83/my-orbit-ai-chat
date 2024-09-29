import { UserInterface } from "~/schema/user";

export interface SignInSuccess {
  access_token: string;
  user_details: UserInterface;
}

export interface SignInProps {
  username: string;
  password: string;
  timezone?: string;
}
