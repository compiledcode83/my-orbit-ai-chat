import { cn } from "~/lib/utils";
import useRightPanelStore, {
  RightPanelStateInterface,
  upsertRightPanelState,
} from "~/store/persist-storage/right-panel-state";

import { Button } from "../button";
import RightPanel from "./panel";

const YourAvatarIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.4981 15.2557C23.4981 15.3004 23.4971 15.3447 23.4951 15.3887C23.2128 15.1383 22.8483 15.0002 22.471 15.0007C22.3089 15.0007 22.1512 15.0254 21.9979 15.0747V10.7503C21.9979 10.5514 21.9189 10.3606 21.7782 10.2199C21.6375 10.0793 21.4467 10.0003 21.2478 10.0003H12.7465C12.5476 10.0003 12.3568 10.0793 12.2161 10.2199C12.0755 10.3606 11.9964 10.5514 11.9964 10.7503V15.2557C11.9964 15.6697 12.3325 16.0058 12.7465 16.0058H21.0237L21.0137 16.0308L21.0107 16.0428L20.5607 17.4269L20.5507 17.4529L20.5317 17.5059H12.7465C12.1497 17.5059 11.5773 17.2688 11.1553 16.8468C10.7333 16.4248 10.4962 15.8525 10.4962 15.2557V10.7503C10.4962 10.1535 10.7333 9.58119 11.1553 9.15919C11.5773 8.7372 12.1497 8.50013 12.7465 8.50013H16.247V7.75006C16.2471 7.56866 16.3129 7.39342 16.4322 7.2568C16.5516 7.12017 16.7164 7.03143 16.8961 7.007L16.9972 7C17.1786 7.00004 17.3538 7.06582 17.4905 7.18516C17.6271 7.3045 17.7158 7.4693 17.7403 7.64906L17.7473 7.75006L17.7463 8.50013H21.2468C21.8436 8.50013 22.416 8.7372 22.838 9.15919C23.26 9.58119 23.4971 10.1535 23.4971 10.7503L23.4981 15.2557ZM18.0403 19.037L18.1523 19.001H11.2503C10.6535 19.001 10.0811 19.2381 9.6591 19.6601C9.23709 20.0821 9 20.6544 9 21.2512V22.1583C8.9999 22.6984 9.11647 23.2322 9.34174 23.723C9.567 24.2139 9.89565 24.6504 10.3052 25.0025C11.8684 26.3456 14.1077 27.0027 16.9972 27.0027C19.0735 27.0027 20.8147 26.6637 22.2109 25.9746C21.9455 25.9238 21.698 25.8045 21.4929 25.6286C21.2878 25.4526 21.1323 25.2261 21.0417 24.9715L21.0377 24.9595L21.0077 24.8665C19.9216 25.2886 18.5874 25.5026 16.9972 25.5026C14.4378 25.5026 12.5415 24.9465 11.2833 23.8644C11.0377 23.6532 10.8405 23.3914 10.7053 23.0969C10.5702 22.8025 10.5002 22.4823 10.5002 22.1583V21.2512C10.5002 21.0523 10.5792 20.8615 10.7199 20.7208C10.8606 20.5802 11.0514 20.5012 11.2503 20.5012H16.9972V20.4982C16.9966 20.1784 17.0956 19.8665 17.2804 19.6056C17.4652 19.3447 17.7265 19.1477 18.0283 19.042L18.0403 19.037ZM15.996 12.7505C16.0007 12.5834 15.9719 12.4171 15.9112 12.2613C15.8506 12.1056 15.7593 11.9636 15.6428 11.8438C15.5262 11.7239 15.3869 11.6287 15.2329 11.5636C15.0789 11.4985 14.9135 11.465 14.7463 11.465C14.5792 11.465 14.4137 11.4985 14.2598 11.5636C14.1058 11.6287 13.9664 11.7239 13.8499 11.8438C13.7334 11.9636 13.6421 12.1056 13.5814 12.2613C13.5208 12.4171 13.4919 12.5834 13.4967 12.7505C13.5059 13.0758 13.6416 13.3847 13.8749 13.6115C14.1083 13.8383 14.4209 13.9652 14.7463 13.9652C15.0718 13.9652 15.3844 13.8383 15.6178 13.6115C15.8511 13.3847 15.9868 13.0758 15.996 12.7505ZM19.2395 11.5004C19.4066 11.4957 19.5729 11.5245 19.7287 11.5852C19.8844 11.6458 20.0264 11.7371 20.1463 11.8536C20.2661 11.9701 20.3614 12.1095 20.4264 12.2634C20.4915 12.4174 20.525 12.5828 20.525 12.75C20.525 12.9171 20.4915 13.0826 20.4264 13.2365C20.3614 13.3905 20.2661 13.5299 20.1463 13.6464C20.0264 13.7629 19.8844 13.8542 19.7287 13.9148C19.5729 13.9755 19.4066 14.0043 19.2395 13.9996C18.9142 13.9904 18.6053 13.8547 18.3784 13.6214C18.1516 13.388 18.0247 13.0754 18.0247 12.75C18.0247 12.4246 18.1516 12.112 18.3784 11.8786C18.6053 11.6453 18.9142 11.5096 19.2395 11.5004ZM21.0868 22.4133C20.7423 21.968 20.2729 21.6354 19.7386 21.4582L18.3614 21.0102C18.2555 20.9725 18.164 20.9031 18.0992 20.8113C18.0345 20.7195 17.9997 20.61 17.9997 20.4977C17.9997 20.3853 18.0345 20.2758 18.0992 20.184C18.164 20.0923 18.2555 20.0228 18.3614 19.9851L19.7386 19.5371C20.1466 19.3964 20.5171 19.1646 20.8222 18.8592C21.1272 18.5539 21.3586 18.1831 21.4988 17.7749L21.5088 17.7409L21.9579 16.3638C21.9953 16.2577 22.0648 16.1657 22.1567 16.1007C22.2486 16.0357 22.3584 16.0008 22.471 16.0008C22.5835 16.0008 22.6933 16.0357 22.7852 16.1007C22.8771 16.1657 22.9466 16.2577 22.984 16.3638L23.4321 17.7409C23.5717 18.1594 23.807 18.5396 24.1191 18.8513C24.4312 19.1631 24.8117 19.3979 25.2304 19.5371L26.6086 19.9851L26.6356 19.9921C26.7414 20.0298 26.8329 20.0993 26.8977 20.191C26.9624 20.2828 26.9972 20.3923 26.9972 20.5047C26.9972 20.617 26.9624 20.7265 26.8977 20.8183C26.8329 20.9101 26.7414 20.9795 26.6356 21.0172L25.2574 21.4652C24.8387 21.6044 24.4582 21.8392 24.1461 22.151C23.834 22.4627 23.5987 22.8429 23.4591 23.2614L23.012 24.6385C22.9739 24.7446 22.9041 24.8364 22.812 24.9015C22.7433 24.9501 22.6643 24.982 22.5812 24.9949C22.4981 25.0078 22.4132 25.0013 22.333 24.9758C22.2529 24.9503 22.1797 24.9066 22.1193 24.848C22.0589 24.7895 22.0129 24.7178 21.9849 24.6385L21.5368 23.2614C21.4367 22.9549 21.2845 22.668 21.0868 22.4133ZM28.7819 26.2146L28.0168 25.9666C27.7842 25.8891 27.5729 25.7586 27.3995 25.5854C27.2261 25.4122 27.0953 25.201 27.0176 24.9685L26.7686 24.2035C26.7479 24.1444 26.7093 24.0932 26.6583 24.057C26.6072 24.0208 26.5461 24.0013 26.4835 24.0013C26.4209 24.0013 26.3599 24.0208 26.3088 24.057C26.2577 24.0932 26.2192 24.1444 26.1985 24.2035L25.9495 24.9675C25.8735 25.1985 25.7453 25.4088 25.5747 25.582C25.4042 25.7553 25.196 25.8869 24.9663 25.9666L24.2002 26.2146C24.1411 26.2353 24.0899 26.2739 24.0537 26.325C24.0175 26.376 23.9981 26.4371 23.9981 26.4997C23.9981 26.5623 24.0175 26.6233 24.0537 26.6744C24.0899 26.7254 24.1411 26.764 24.2002 26.7847L24.9663 27.0337C25.1993 27.1116 25.4109 27.2427 25.5843 27.4167C25.7578 27.5906 25.8883 27.8026 25.9655 28.0358L26.2135 28.7999C26.2347 28.8585 26.2734 28.9092 26.3244 28.945C26.3754 28.9808 26.4362 29 26.4985 29C26.5609 29 26.6217 28.9808 26.6727 28.945C26.7237 28.9092 26.7624 28.8585 26.7836 28.7999L27.0336 28.0358C27.1111 27.8033 27.2416 27.5919 27.4149 27.4185C27.5881 27.2451 27.7993 27.1144 28.0318 27.0367L28.7979 26.7887C28.8569 26.768 28.9081 26.7294 28.9443 26.6784C28.9806 26.6273 29 26.5663 29 26.5037C29 26.4411 28.9806 26.38 28.9443 26.329C28.9081 26.2779 28.8569 26.2393 28.7979 26.2186L28.7819 26.2146Z"
      fill="currentColor"
    />
  </svg>
);

const AutoAIIcon = () => (
  <svg
    className="scale-[80%]"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 11.25C21.862 11.25 22.6886 10.9076 23.2981 10.2981C23.9076 9.6886 24.25 8.86195 24.25 8H25.75C25.75 8.86195 26.0924 9.6886 26.7019 10.2981C27.3114 10.9076 28.138 11.25 29 11.25V12.75C28.138 12.75 27.3114 13.0924 26.7019 13.7019C26.0924 14.3114 25.75 15.138 25.75 16H24.25C24.25 15.138 23.9076 14.3114 23.2981 13.7019C22.6886 13.0924 21.862 12.75 21 12.75V11.25ZM10 13C10 12.4696 10.2107 11.9609 10.5858 11.5858C10.9609 11.2107 11.4696 11 12 11H19V9H12C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13V23C8 24.0609 8.42143 25.0783 9.17157 25.8284C9.92172 26.5786 10.9391 27 12 27H24C25.0609 27 26.0783 26.5786 26.8284 25.8284C27.5786 25.0783 28 24.0609 28 23V18H26V23C26 23.5304 25.7893 24.0391 25.4142 24.4142C25.0391 24.7893 24.5304 25 24 25H12C11.4696 25 10.9609 24.7893 10.5858 24.4142C10.2107 24.0391 10 23.5304 10 23V13Z"
      fill="currentColor"
    />
  </svg>
);

interface IPanel {
  Icon: ({ bg, color }: { bg?: string; color?: string }) => JSX.Element;
  value: RightPanelStateInterface["data"];
}

const panels: IPanel[] = [
  { value: "your-avatar", Icon: YourAvatarIcon },
  { value: "auto-ai", Icon: AutoAIIcon },
];

export default function RightPanelTrigger() {
  return (
    <>
      <div className="ml-auto flex max-md:hidden">
        <RightPanel />
        <aside className="z-10 flex h-screen w-16 flex-col items-center gap-y-2 bg-white py-4 shadow-md">
          {panels.map((panel) => (
            <RightPanelTriggerItem
              key={panel.value + "right-panel-trigger"}
              panel={panel}
            />
          ))}
        </aside>
      </div>

      <div className="hidden md:flex"></div>
    </>
  );
}

const RightPanelTriggerItem = ({ panel }: { panel: IPanel }) => {
  const selectedPanel = useRightPanelStore.use.data();
  const onClick = () =>
    upsertRightPanelState(panel.value === selectedPanel ? null : panel.value);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "hover:text-primary",
        selectedPanel === panel.value
          ? "bg-primary/10 text-primary hover:bg-primary/10"
          : "bg-none text-gray-500 hover:bg-primary/5",
      )}
    >
      <panel.Icon />
    </Button>
  );
};
