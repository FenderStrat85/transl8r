export interface Language {
  label: string;
  value: string;
}

export interface IRoomInfo {
  room: string;
  name: string;
}

export interface IChatMessage {
  room: string;
  authorName: string;
  _id: string;
  user_id: string;
  message: string;
  time: string;
}
