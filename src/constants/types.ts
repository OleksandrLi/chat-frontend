export interface WSUserOnlineEvent {
  userId: number;
}

export interface WSUserOfflineEvent {
  userId: number;
}

export interface OnlineOfflineStatusEvent {
  userId: number;
  isOnline: boolean;
}
