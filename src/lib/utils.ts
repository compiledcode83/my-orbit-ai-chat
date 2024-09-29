import axios from "axios";
import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getTimezone() {
  try {
    return await axios
      .get("https://api.ipify.org/?format=json")
      .then(async (res) =>
        res.data.ip
          ? await axios
              .get(
                `https://ipinfo.io/${res.data.ip}/json?token=${import.meta.env.VITE_IP_INFO_KEY}`,
              )
              .then(({ data }) => data?.timezone || "")
          : "",
      );
  } catch {
    return "";
  }
}
