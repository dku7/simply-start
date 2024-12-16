import { useState } from "react";
import Notes from "./Notes";
import Settings from "./Settings";

type TabTitleType = "Notes" | "Settings";

const renderTabContent = (activeTab: TabTitleType) => {
  switch (activeTab) {
    case "Notes":
      return <Notes />;
    case "Settings":
      return <Settings />;
  }
};

export default function ButtonBar() {
  const [activeTab, setActiveTab] = useState<TabTitleType>("Notes");

  const handleChangeTab = (tab: TabTitleType) => {
    setActiveTab(tab);
  };

  const selectedClassName = "mr-2 border-b-2 border-slate-500";

  return (
    <>
      <div className="flex w-full justify-start">
        <button
          className={activeTab === "Notes" ? selectedClassName : "mr-2"}
          value={"Notes"}
          onClick={() => {
            handleChangeTab("Notes");
          }}
        >
          Notes
        </button>

        <button
          className={activeTab === "Settings" ? selectedClassName : "mr-2"}
          value={"Settings"}
          onClick={() => {
            handleChangeTab("Settings");
          }}
        >
          Settings
        </button>
      </div>
      <div className="mt-2 w-full">{renderTabContent(activeTab)}</div>
    </>
  );
}
