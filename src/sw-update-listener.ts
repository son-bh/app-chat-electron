import { useEffect } from "react";
import { IS_WEB } from "./shared/constants";

// Only import when running in web
let useRegisterSW:
  | typeof import("virtual:pwa-register/react").useRegisterSW
  | null = null;

if (IS_WEB) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  useRegisterSW = require("virtual:pwa-register/react").useRegisterSW;
}

export function useServiceWorkerUpdater() {
  if (!IS_WEB || !useRegisterSW) {
    return; // Skip service worker in Electron
  }

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log("✅ Service Worker registered", registration);
    },
    onNeedRefresh() {
      console.log("🔄 New version detected");
      setNeedRefresh(true);
    },
    onOfflineReady() {
      console.log("📦 App is ready for offline use");
      setOfflineReady(true);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      updateServiceWorker(true); // reload after update
    }
  }, [needRefresh, updateServiceWorker]);

  useEffect(() => {
    if (offlineReady) {
      console.log("⚡ Running in offline mode");
    }
  }, [offlineReady]);
}
