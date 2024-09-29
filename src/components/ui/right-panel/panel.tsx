import useRightPanelStore from "~/store/persist-storage/right-panel-state";

export default function RightPanel() {
  const selectedPanel = useRightPanelStore.use.data();

  if (!selectedPanel) {
    return null;
  }

  return (
    <div className="md:max-w-md max-w-[90vw] bg-white ml-auto h-screen w-full"></div>
  );
}
