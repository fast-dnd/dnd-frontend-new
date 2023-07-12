import { io } from "socket.io-client";

import { BACKEND_URL } from "@/services/api-factory";

export const socketIO = io(BACKEND_URL);
