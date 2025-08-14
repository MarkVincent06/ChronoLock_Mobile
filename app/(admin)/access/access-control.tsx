import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API_URL from "@/config/ngrok-api";

interface Account {
  id: number;
  idNumber: string;
  privilege_status: string;
  name: string;
  userType: string;
  avatar: string;
}

// Type assertion to fix TypeScript compatibility issues
const Icon = FontAwesome as any;

const AccessControl = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch accounts from the backend
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/remote-access/fetchAccounts`
      );
      const data: Account[] = response.data.data || [];
      setAccounts(data);
      setFilteredAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Handle search input changes (idNumber, name, userType, privilege_status)
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const t = text.toLowerCase();
    const filtered = accounts.filter(
      (a) =>
        (a.idNumber || "").toLowerCase().includes(t) ||
        (a.name || "").toLowerCase().includes(t) ||
        (a.userType || "").toLowerCase().includes(t) ||
        (a.privilege_status || "").toLowerCase().includes(t)
    );
    setFilteredAccounts(filtered);
  };

  // Badge styles based on status
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Granted":
        return styles.badgeGranted;
      case "Revoked":
        return styles.badgeRevoked;
      case "Pending":
        return styles.badgePending;
      default:
        return styles.badgeDefault;
    }
  };

  // Update privilege handler
  const handlePrivilegeUpdate = async (
    idNumber: string,
    action: "Grant" | "Revoke"
  ) => {
    const newStatus = action === "Grant" ? "Granted" : "Revoked";
    try {
      const response = await axios.post(
        `${API_URL}/remote-access/updatePrivilege`,
        {
          idNumber,
          privilege_status: newStatus,
        }
      );
      if (response.data?.success) {
        Alert.alert("Success", `Privilege successfully ${action}ed.`);
        fetchAccounts();
      } else {
        throw new Error(response.data?.message || "Update failed.");
      }
    } catch (error) {
      console.error("Error updating privilege:", error);
      Alert.alert("Error", "Failed to update privilege. Please try again.");
    }
  };

  const renderItem = ({ item }: { item: Account }) => {
    const avatarSource = item.avatar
      ? item.avatar.startsWith("http") || item.avatar.startsWith("file")
        ? { uri: item.avatar }
        : { uri: `${API_URL}${item.avatar}` }
      : require("@/assets/images/default_avatar.png");

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Image source={avatarSource} style={styles.avatar} />
          <View style={styles.cardContent}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name || "Unknown"}
            </Text>
            <Text style={styles.metaText} numberOfLines={1}>
              {item.idNumber} · {item.userType || "N/A"}
            </Text>
          </View>
          <View style={[styles.badge, getBadgeStyle(item.privilege_status)]}>
            <Text style={styles.badgeText}>{item.privilege_status}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              Alert.alert(
                "Update Privilege",
                `Choose action for ${item.idNumber}`,
                [
                  {
                    text: "Grant",
                    onPress: () =>
                      handlePrivilegeUpdate(item.idNumber, "Grant"),
                  },
                  {
                    text: "Revoke",
                    onPress: () =>
                      handlePrivilegeUpdate(item.idNumber, "Revoke"),
                  },
                  { text: "Cancel", style: "cancel" },
                ]
              )
            }
          >
            <Icon
              name="cog"
              size={14}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.actionButtonText}>Actions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={router.back}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Remote Access Accounts</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by ID, name, type, or status..."
          value={searchTerm}
          onChangeText={handleSearch}
          placeholderTextColor="#b0b0b0"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={filteredAccounts}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "#888" }}>No accounts found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 35,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  metaText: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  badgeGranted: {
    backgroundColor: "#10B981",
  },
  badgeRevoked: {
    backgroundColor: "#EF4444",
  },
  badgePending: {
    backgroundColor: "#F59E0B",
  },
  badgeDefault: {
    backgroundColor: "#6B7280",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#007bff",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default AccessControl;
