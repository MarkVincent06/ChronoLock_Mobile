import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";

const AccessControl = () => {
  const [bleManager] = useState(new BleManager());
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [connectionStatus, setConnectionStatus] = useState("Searching...");
  const [characteristicUUID] = useState("9796426f-1107-4a65-b026-d6b82bb2fb32"); // Replace with your characteristic UUID
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Replace with the actual service UUID of the Raspberry Pi (if available)
  const serviceUUID = "f27d3624-0e50-48d4-9eee-7a59e60e101b"; // Replace with your service UUID
  const targetDeviceId = "DC:A6:32:19:41:04"; // Replace with the actual Raspberry Pi device ID

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      bleManager.destroy();
    };
  }, [bleManager]);

  useEffect(() => {
    if (connectedDevice) {
      connectedDevice.onDisconnected(() => {
        console.warn("Device disconnected");
        setConnectionStatus("Disconnected");
        setConnectedDevice(null);
      });
    }
  }, [connectedDevice]);

  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === "android") {
        await requestPermissions();
      }
    };
    checkPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        if (Platform.Version >= 31) {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);
          if (
            granted["android.permission.BLUETOOTH_SCAN"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.BLUETOOTH_CONNECT"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.ACCESS_FINE_LOCATION"] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log("All permissions granted.");
          } else {
            console.warn("Not all permissions granted.");
          }
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permission granted.");
          } else {
            console.warn("Location permission not granted.");
          }
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scanAndConnect = () => {
    setIsLoading(true); // Start loading
    setConnectionStatus("Searching for connected devices...");

    // Check if the device is already connected
    bleManager
      .connectedDevices([serviceUUID])
      .then((connectedDevices) => {
        const device = connectedDevices.find((d) => d.id === targetDeviceId);
        if (device) {
          Alert.alert(`Already connected to device: ${device.name}`);
          setConnectionStatus("Connected!");
          setConnectedDevice(device);
          setIsLoading(false);
          return;
        }

        // If no device is connected, start a scan
        setConnectionStatus("Scanning for devices...");
        startScan();
      })
      .catch((error) => {
        console.error("Failed to retrieve connected devices:", error);
        setIsLoading(false);
      });
  };

  const startScan = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan error:", error);
        setConnectionStatus("Error scanning for devices...");
        setIsLoading(false); // Stop loading on error
        return;
      }

      //console.log("Discovered device:", device); // Log discovered devices
      //console.warn("Discovered device:", device); // Log discovered devices

      // Check if device is not null and matches the target name and ID8

      // if (
      //   device &&
      //   (device.name === "RaspberryPiLock" || device.id === targetDeviceId)
      // ) {
      //   bleManager.stopDeviceScan();
      //   Alert.alert(`Found device: ${device.name}`);
      //   setConnectionStatus("Connecting...");
      //   connectToDevice(device);
      // }

      if (device && device.name?.includes("Raspberry")) {
        console.warn("FOUND!", device);
        bleManager.stopDeviceScan();
        Alert.alert(`Found device: ${device.name}`);
        setConnectionStatus("Connecting...");
        connectToDevice(device);
      }
    });
  };
  const connectToDevice = async (device: Device) => {
    try {
      setConnectionStatus("Connecting to device...");
      const connectedDevice = await device.connect();
      console.log("Device connected:", connectedDevice);

      // Discover all services and characteristics
      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log("Services and characteristics discovered");

      // Save the connected device
      setConnectedDevice(connectedDevice);
      setConnectionStatus("Connected!");

      // Verify the services and characteristics
      await verifyServiceAndCharacteristic(connectedDevice);

      Alert.alert("Connected to the device successfully!");
    } catch (error) {
      console.error("Connection failed:", error);
      Alert.alert("Failed to connect to the device.");
      setConnectionStatus("Failed to connect.");
    }
  };

  const verifyServiceAndCharacteristic = async (device: Device) => {
    try {
      const services = await device.services();
      console.log("Discovered services:", services);

      const targetService = services.find((s) => s.uuid === serviceUUID);
      if (!targetService) {
        console.error(`Service with UUID ${serviceUUID} not found.`);
        Alert.alert("Error", `Target service not found: ${serviceUUID}`);
        return;
      }

      const characteristics = await targetService.characteristics();
      console.log("Discovered characteristics:", characteristics);

      const targetCharacteristic = characteristics.find(
        (c) => c.uuid === characteristicUUID
      );
      if (!targetCharacteristic) {
        console.error(
          `Characteristic with UUID ${characteristicUUID} not found.`
        );
        Alert.alert(
          "Error",
          `Target characteristic not found: ${characteristicUUID}`
        );
        return;
      }

      console.log("Service and characteristic verified successfully.");
      Alert.alert("Success", "Service and characteristic verified!");
    } catch (error) {
      console.error("Error verifying service/characteristic:", error);
      Alert.alert("Error", "Failed to verify service or characteristic.");
    }
  };

  const sendCommand = async (command: number) => {
    if (!connectedDevice) {
      Alert.alert("Device not connected. Please connect first.");
      return;
    }

    try {
      // Encode command as Base64
      const commandArray = new Uint8Array([command]);
      const base64Command = Buffer.from(commandArray).toString("base64");

      console.log("Sending command:", command);
      await connectedDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        base64Command
      );

      Alert.alert(`Command sent: ${command === 1 ? "Unlock" : "Lock"}`);
    } catch (error) {
      // Narrow down the type of error
      if (error instanceof Error) {
        console.error("Failed to send command:", error.message);
        Alert.alert("Failed to send command", error.message);
      } else {
        console.error("Failed to send command:", error);
        Alert.alert("Failed to send command", "An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Control</Text>
      <Text style={styles.description}>
        Here you can manage the remote locking and unlocking of the laboratory
        door via Bluetooth.
      </Text>

      {/* Show ActivityIndicator while loading */}
      {isLoading && <ActivityIndicator size="large" color="#1e90ff" />}

      {/* Disable buttons while scanning */}
      <Button
        title="Connect via Bluetooth"
        onPress={scanAndConnect}
        color="#1e90ff"
        disabled={isLoading} // Disable if loading
      />
      <Button
        title="Unlock Door"
        onPress={() => sendCommand(1)} // Send unlock command
        color="#28a745"
        disabled={isLoading || !connectedDevice} // Disable if loading or not connected
      />
      <Button
        title="Lock Door"
        onPress={() => sendCommand(0)} // Send lock command
        color="#dc3545"
        disabled={isLoading || !connectedDevice} // Disable if loading or not connected
      />

      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {connectionStatus}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 20,
  },
});

export default AccessControl;
