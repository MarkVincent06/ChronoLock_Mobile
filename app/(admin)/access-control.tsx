import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import axios from "axios";
import API_URL from "@/config/ngrok-api";

interface Account {
  id: number;
  idNumber: string;
  privilege_status: string;
}

const AccessControl = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch accounts from the backend
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/remote-access/fetchAccounts`
      );
      setAccounts(response.data.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Function to handle privilege updates (Grant/Revoke)
  const handlePrivilegeUpdate = async (idNumber: string, action: string) => {
    const newStatus = action === "Grant" ? "Granted" : "Revoked";
    try {
      const response = await axios.post(
        `${API_URL}/remote-access/updatePrivilege`,
        {
          idNumber,
          privilege_status: newStatus,
        }
      );

      if (response.data.success) {
        Alert.alert("Success", `Privilege successfully ${action}ed.`);
        fetchAccounts(); // Refresh the account list
      } else {
        throw new Error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Error updating privilege:", error);
      Alert.alert("Error", "Failed to update privilege. Please try again.");
    }
  };

  // Function to determine the text color based on privilege status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Granted":
        return "green";
      case "Revoked":
        return "red";
      case "Pending":
        return "#e6c300";
      default:
        return "black";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Access Control</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>#</Text>
            <Text style={styles.tableHeader}>Student Number</Text>
            <Text style={styles.tableHeader}>Privilege Status</Text>
            <Text style={styles.tableHeader}>Actions</Text>
          </View>

          {/* Table Data */}
          <ScrollView style={styles.scrollContainer}>
            {accounts.map((account, index) => (
              <View key={account.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>{account.idNumber}</Text>
                <Text
                  style={[
                    styles.tableCell,
                    { color: getStatusColor(account.privilege_status) },
                  ]}
                >
                  {account.privilege_status}
                </Text>
                <Menu>
                  <MenuTrigger>
                    <View style={styles.triggerButton}>
                      <Text style={styles.triggerButtonText}>Actions</Text>
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: {
                        backgroundColor: "#fff",
                        padding: 5,
                        borderRadius: 5,
                        elevation: 5,
                      },
                    }}
                  >
                    <MenuOption
                      onSelect={() =>
                        handlePrivilegeUpdate(account.idNumber, "Grant")
                      }
                    >
                      <Text style={styles.menuOption}>Grant</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() =>
                        handlePrivilegeUpdate(account.idNumber, "Revoke")
                      }
                    >
                      <Text style={styles.menuOption}>Revoke</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            ))}
          </ScrollView>
        </View>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  scrollContainer: {
    maxHeight: 450,
  },
  tableRow: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  triggerButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  triggerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  menuOption: {
    padding: 8,
    fontSize: 16,
  },
});

export default AccessControl;
