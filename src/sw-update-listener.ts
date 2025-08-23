import { useEffect } from "react";
import { IS_WEB } from "./shared/constants";

export function useServiceWorkerUpdater() {
  if (!IS_WEB) {
    return;
  }

  // Only import PWA register when building for web
  try {
    // Check if the module is available (not undefined)
    const pwaModule = require("virtual:pwa-register/react");
    if (!pwaModule || pwaModule === "undefined") {
      console.log("PWA register not available for Electron build");
      return;
    }
    
    const { useRegisterSW } = pwaModule;
    
    const {
      needRefresh: [needRefresh, setNeedRefresh],
      offlineReady: [offlineReady, setOfflineReady],
      updateServiceWorker,
    } = useRegisterSW({
      onRegistered(registration: any) {
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
  } catch (error) {
    // PWA register not available (Electron build)
    console.log("PWA register not available for Electron build");
  }
}
