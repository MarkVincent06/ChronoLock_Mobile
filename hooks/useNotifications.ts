import { useEffect } from "react";
import { setupNotificationListeners } from "../services/notificationService";
import { useUserContext } from "../context/UserContext";

export const useNotifications = () => {
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      // Setup notification listeners when user is logged in
      const cleanup = setupNotificationListeners();

      return cleanup;
    }
  }, [user]);

  return null;
};
