import React, { createContext, ReactElement, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import config from "../../constants/config";
import { getAccessWithLocalStorage } from "../../utils/localStorage";
import { WSUserOfflineEvent, WSUserOnlineEvent } from "../../constants/types";
import { useChats } from "../../hooks";

export const WebsocketContext = createContext<Socket | null>(null);

export const WebsocketProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [webSocket, setWebSocket] = useState<null | Socket>(null);
  const access = getAccessWithLocalStorage();
  const { onSetStatus } = useChats();

  const onUserStatusChange = (
    data: WSUserOnlineEvent | WSUserOfflineEvent,
    isOnline: boolean
  ) => {
    const payload = { userId: data.userId, isOnline };
    onSetStatus(payload);
  };

  useEffect(() => {
    if (access) {
      const socket = io(config.API_URL, {
        auth: { token: access },
        transports: ["websocket"],
      });
      setWebSocket(socket);
    }
  }, [access]);

  useEffect(() => {
    if (webSocket) {
      webSocket?.on("online", (data: WSUserOnlineEvent) => {
        onUserStatusChange(data, true);
      });
      webSocket?.on("offline", (data: WSUserOfflineEvent) => {
        onUserStatusChange(data, false);
      });

      webSocket?.connect();
    }

    return () => {
      if (webSocket) {
        webSocket.off("online");
        webSocket.off("offline");
        webSocket.disconnect();
      }
    };
  }, [webSocket]);

  return (
    <WebsocketContext.Provider value={webSocket}>
      {children}
    </WebsocketContext.Provider>
  );
};
