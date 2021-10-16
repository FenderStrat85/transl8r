export interface Language {
  label: string;
  value: string;
}

export interface IChatMessage {
  room: string;
  authorName: string;
  _id: string;
  userId: string;
  message: string;
  time: string;
}

export interface IImage {
  _id: string;
  imageUrl: string;
  translatedText: string;
  imageUrlTranslated: string;
  JobId: string;
}
