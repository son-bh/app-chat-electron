import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";

export const useSocketEvent = (eventName: string, handler: any): void => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, eventName, handler]);
};
