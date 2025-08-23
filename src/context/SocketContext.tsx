import { API_BASE_URL } from "@/shared/constants";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

type TypedSocket = Socket;

interface SocketContextType {
  socket: TypedSocket | null;
  isConnected: boolean;
}

interface SocketProviderProps {
  children: ReactNode;
  serverUrl?: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<TypedSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    console.log("🚀 ~ SocketProvider ~ API_BASE_URL:", API_BASE_URL);
    const newSocket: TypedSocket = io(API_BASE_URL);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    newSocket.on("disconnect", (reason: string) => {
      console.log("Disconnected from server:", reason);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error: Error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const value: SocketContextType = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
