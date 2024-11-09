import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

export default function PermissionSetting() {
  return (
    <div className="pb-20">
      {permissionsSettings.map((setting, i) => (
        <div key={i}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl">{setting.title}</p>
              <p className="text-base">{setting.description}</p>
            </div>
            <Switch />
          </div>
          <Separator className="my-6" />
        </div>
      ))}
    </div>
  );
}

interface PermissionSetting {
  title: string;
  description: string;
}

const permissionsSettings: PermissionSetting[] = [
  {
    title: "Camera",
    description:
      "Allows the website to access the device's camera for video calls.",
  },
  {
    title: "Microphone",
    description:
      "Enables the website to capture audio (for voice input or calls).",
  },
  {
    title: "Geolocation",
    description:
      "Accesses the user's current location for location-based services.",
  },
  {
    title: "Push Notifications",
    description: "Sends notifications to the user from the web application.",
  },
  {
    title: "Clipboard Access",
    description:
      "Allows reading from and writing to the user's clipboard (for copy-paste functionalities.",
  },
  {
    title: "Background Sync",
    description: "Allows the web app to synchronize data in the background.",
  },
  {
    title: "Local Storage Access",
    description:
      "Allow saving user data and session information along with cookies for a smoother experience and user safety.",
  },
  {
    title: "Bluetooth Access",
    description: "Allow connection to nearby Bluetooth devices.",
  },
  {
    title: "Share Device Info",
    description:
      "Some services might not work on older hardware. This access helps us understand this and push the correct version to your device.",
  },
];
