declare global {
  namespace NodeJS {
    interface Process {
      type: string;
    }
  }

  interface Window {
    process?: {
      env?: {
        BUILD_TARGET?: string;
      };
    };
    electronAPI?: {
      send: (channel: string, data: any) => void;
      receive: (channel: string, func: (...args: any[]) => void) => void;
      showNotification: (payload: any) => void;
    };
  }
}

export {};
