import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { IS_WEB } from "./shared/constants";

export function useServiceWorkerUpdater() {
  if (!IS_WEB) {
    return;
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
