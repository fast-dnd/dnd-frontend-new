import { BACKEND_URL } from "@/services/api-factory";
import { io } from "socket.io-client";

export const socketIO = io(BACKEND_URL);
