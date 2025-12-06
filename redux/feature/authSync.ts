import { store } from "@/redux/store";
import { logout, setUser } from "@/redux/feature/authSlice";
import { router } from "expo-router";

const channel = new BroadcastChannel("auth-sync");

export const listenAuthChanges = () => {
  channel.onmessage = (event) => {
    const { type, payload } = event.data;

 if (type === "LOGOUT") {
    store.dispatch(logout());
    router.replace("/(auth)/login");
  }

  if (type === "LOGIN") {
    store.dispatch(setUser(payload));
    router.replace("/(tabs)");
  }
  };
};

export const broadcastLogin = (userData: any) => {
  channel.postMessage({ type: "LOGIN", payload: userData });
};

export const broadcastLogout = () => {
  channel.postMessage({ type: "LOGOUT" });
};
