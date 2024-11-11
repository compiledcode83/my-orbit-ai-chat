import { MyOrbitActivityIndicatorInterface } from "~/schema/my-orbit";

export default function ChatIndicator(
  props: MyOrbitActivityIndicatorInterface,
) {
  return (
    <div className="flex flex-row items-center gap-x-1 text-[10px]">
      <small>
        {props.sender} is <span className="font-medium">{props.type}</span>
      </small>

      {props.type === "Typing" && (
        <div className="typing">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      )}

      {props.type === "Thinking" && (
        <img
          className="size-5"
          src="/assets/indicator/thinking.svg"
          alt="MyOrbitAi"
        />
      )}
    </div>
  );
}
