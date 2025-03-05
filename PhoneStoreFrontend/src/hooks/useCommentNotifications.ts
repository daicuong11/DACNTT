import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { notification } from "antd";

const API_HUB_URL: string = import.meta.env.VITE_HUB_URL || ''

export const useCommentNotifications = () => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(API_HUB_URL) // Địa chỉ backend
      .withAutomaticReconnect() // Tự động kết nối lại nếu bị mất
      .build();

    connection.start().catch((err) => console.error("SignalR Connection Error:", err));

    connection.on("ReceiveComment", (username: string, productName: string) => {
      notification.info({
        message: "Bình luận mới!",
        description: `${username} vừa bình luận sản phẩm "${productName}"`,
      });
    });

    return () => {
      connection.stop();
    };
  }, []);
};
