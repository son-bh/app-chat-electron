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
        API_URL?: string;
        VITE_API_URL?: string;
      };
    };
    __ENV__?: {
      BUILD_TARGET?: string;
      API_URL?: string;
      VITE_API_URL?: string;
      TINY_API_KEY?: string;
      [key: string]: string | undefined;
    };
    electronAPI?: {
      send: (channel: string, data: any) => void;
      receive: (channel: string, func: (...args: any[]) => void) => void;
      showNotification: (payload: any) => void;
    };
  }

  var __ENV__: {
    BUILD_TARGET?: string;
    API_URL?: string;
    VITE_API_URL?: string;
    TINY_API_KEY?: string;
    [key: string]: string | undefined;
  } | undefined;
}

export {};
