import { useState, useCallback } from "react";
import { RefreshControl } from "react-native";
import axios from "axios";

const usePullToRefresh = (fetchData: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData(); // Call the function to fetch data
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

  return { refreshing, onRefresh };
};

export default usePullToRefresh;
