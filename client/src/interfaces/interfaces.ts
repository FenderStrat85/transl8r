export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  languages: string[];
}

export interface ILanguage {
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

export interface IJob {
  _id: string;
  status: string;
  languageFrom: string;
  languageFromName: string;
  languageTo: string;
  languageToName: string;
  jobType: string;
  dateCompleted: Date;
  jobName: string;
  jobDescription: string;
  notification: boolean;
}

export interface IImageJob {
  _id: string;
  image: string;
  jobName: string;
}

export interface IDbMessage {
  _id: string;
  messageAuthor: string;
  messageContent: string;
  ConversationId: string;
}
