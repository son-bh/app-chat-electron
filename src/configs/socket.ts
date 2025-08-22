import { API_BASE_URL } from "@/shared/constants";
import { io } from "socket.io-client";

const socket = io(API_BASE_URL);

export default socket;