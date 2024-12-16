import { useEffect, useState } from "react";
import {
  getNotificationSettings,
  saveNotificationSettings,
} from "../services/api";

export default function SoundSettings() {
  const [playNotifications, setPlayNotifications] = useState<boolean>(true);

  useEffect(() => {
    setPlayNotifications(getNotificationSettings());
  }, []);

  const handlePlayNotifications = () => {
    const newSetting = !playNotifications;

    setPlayNotifications(newSetting);
    saveNotificationSettings(newSetting);
  };

  return (
    <>
      <header>
        <h3 className="mt-8 font-semibold">Sounds</h3>
      </header>
      <input
        type="checkbox"
        name="play-notifications"
        id="play-notifications"
        checked={playNotifications}
        onChange={handlePlayNotifications}
      />
      <label className="ml-2" htmlFor="play-notifications">
        Play notifications
      </label>
    </>
  );
}
