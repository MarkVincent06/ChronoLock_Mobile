import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { useUserContext } from "../../context/UserContext";

const { setUser } = useUserContext();

// Define a background task name
export const BACKGROUND_LOCATION_TASK = "background-location-task";

// Register the background task
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Error in background location task:", error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    if (locations && locations.length > 0) {
      const location = locations[0];
      console.log("Background location update:", location);

      // Update user context with the background location
      setUser((prevUser) => (prevUser ? { ...prevUser, location } : prevUser));
    }
  }
});
