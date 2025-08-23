declare global {
  namespace NodeJS {
    interface Process {
      type: string;
    }
  }

  interface Window {
    electronSocket: any;
    electron: any;
  }
}

export {};
