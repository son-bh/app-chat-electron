import { useEffect, useRef, useState } from 'react';
import { CookiesStorage } from '../shared/utils/cookie-storage';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '@/shared/constants/common';

const SOCKET_SERVER_URL = API_BASE_URL;
const PING_INTERVAL = 30 * 1000; // 1 phút
const SOCKET_EVENTS = {
  PING: 'PING',
};

interface PingPayload {
  userId: string;
}

export function useLiveSocketWithAutoLogout(
  userId: string | null,
  timeoutMs: number = 10 * 60 * 1000
) {
  const socketRef = useRef<Socket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeoutMs);

  const logout = () => {
    CookiesStorage.clearSession();
    localStorage.setItem('forceLogout', Date.now().toString());
    setIsRunning(false);

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    window.location.href = '/login';
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    setTimeLeft(timeoutMs);
    setIsRunning(true);

    // timerRef.current = setTimeout(logout, timeoutMs);

    countdownRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          clearInterval(countdownRef.current!);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  useEffect(() => {
    const token = CookiesStorage.getAccessToken();
    if (!token || !userId) return;

    // 1. Tạo socket
    const socket = io(SOCKET_SERVER_URL, {
      auth: { userId },
      transports: ['websocket'],
      withCredentials: true,
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Đã kết nối với server');
    });

    socket.on('disconnect', () => {
      console.log('❌ Đã ngắt kết nối với server');
    });

    socket.on('connect_error', err => {
      console.error('⚠️ Lỗi kết nối:', err.message);
    });

    intervalRef.current = setInterval(() => {
      socket.emit(SOCKET_EVENTS.PING, { userId } as PingPayload);
    }, PING_INTERVAL);

    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ];
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'forceLogout') {
        // logout();
      }
    };
    window.addEventListener('storage', handleStorage);

    resetTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      window.removeEventListener('storage', handleStorage);

      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (socketRef.current) {
        socketRef.current.off('connect');
        socketRef.current.off('disconnect');
        socketRef.current.off('connect_error');
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      setIsRunning(false);
    };
  }, [userId]);

  return {
    isRunning,
    timeLeftSeconds: Math.ceil(timeLeft / 1000),
    resetTimer,
    logout,
  };
}
