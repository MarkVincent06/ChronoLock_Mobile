import EventEmitter from "events";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

export const locationEmitter = new EventEmitter();

export const BACKGROUND_LOCATION_TASK = "background-location-task";

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Error in background location task:", error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    if (locations && locations.length > 0) {
      const location = locations[0];
      console.warn("Background location update:", location);

      // Emit the location update
      locationEmitter.emit("locationUpdate", location);
    }
  }
});
