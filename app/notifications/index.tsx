import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import { useUserContext } from "@/context/UserContext";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import IonIcons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
4;
const Icon = IonIcons as any;

interface Notification {
  id: number;
  user_id: string;
  title: string;
  message: string;
  type: "alert" | "reminder" | "announcement";
  status: "unread" | "read";
  is_push: boolean;
  created_at: string;
}

const index = () => {
  const { user } = useUserContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const markAllAsRead = useCallback(async () => {
    if (!user?.idNumber) return;

    try {
      // Get all unread notification IDs
      const unreadNotifications = notifications.filter(
        (notif) => notif.status === "unread"
      );
      const unreadIds = unreadNotifications.map((notif) => notif.id);

      if (unreadIds.length === 0) return;

      // Mark all unread notifications as read in backend
      await axios.put(`${API_URL}/notifications/mark-read`, {
        userId: user.idNumber,
        notificationIds: unreadIds,
      });

      // Don't update local state - let user refresh to see changes
    } catch (err) {
      console.error("Error marking notifications as read:", err);
      // Don't show error to user as this is a background operation
    }
  }, [user?.idNumber, notifications]);

  const fetchNotifications = useCallback(async () => {
    if (!user?.idNumber) {
      setError("User not found");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await axios.get(
        `${API_URL}/notifications/${user.idNumber}`
      );

      if (response.data.success) {
        setNotifications(response.data.data);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [user?.idNumber]);

  const { refreshing, onRefresh } = usePullToRefresh(fetchNotifications);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Mark all notifications as read when user enters the screen
  useEffect(() => {
    if (notifications.length > 0) {
      markAllAsRead();
    }
  }, [markAllAsRead, notifications.length]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return "information-circle";
      case "reminder":
        return "time";
      case "announcement":
        return "megaphone";
      default:
        return "notifications";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "#3498db";
      case "reminder":
        return "#4ecdc4";
      case "announcement":
        return "#45b7d1";
      default:
        return "#95a5a6";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const iconName = getNotificationIcon(item.type);
    const iconColor = getNotificationColor(item.type);
    const isUnread = item.status === "unread";

    return (
      <TouchableOpacity
        style={[styles.notificationItem, isUnread && styles.unreadNotification]}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={24} color={iconColor} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.title, isUnread && styles.unreadText]}>
              {item.title}
            </Text>
            <Text style={styles.timestamp}>{formatDate(item.created_at)}</Text>
          </View>

          <Text style={[styles.message, isUnread && styles.unreadText]}>
            {item.message}
          </Text>
        </View>

        {isUnread && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="notifications-outline" size={80} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Notifications</Text>
      <Text style={styles.emptyMessage}>
        You don't have any notifications yet. Check back later for updates!
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="alert-circle-outline" size={80} color="#e74c3c" />
      <Text style={styles.emptyTitle}>Error Loading Notifications</Text>
      <Text style={styles.emptyMessage}>
        {error || "Something went wrong. Please try again."}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchNotifications}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </View>
    );
  }

  if (error) {
    return renderErrorState();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContainer,
          notifications.length === 0 && styles.emptyListContainer,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007bff"]}
            tintColor="#007bff"
          />
        }
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    fontWeight: "700",
  },
  timestamp: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  message: {
    fontSize: 14,
    color: "#5a6c7d",
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007bff",
    position: "absolute",
    top: 16,
    right: 16,
  },
  separator: {
    height: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#5a6c7d",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
