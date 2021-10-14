export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  averageRating?: number;
}
export interface ICustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface ITranslator {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  averageRating: string;
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
}

export interface ILanguage {
  _id: string;
  languageName: string;
}

export interface IConversation {
  _id: string;
}

export interface IMessage {
  _id: string;
  messageAuthor: string;
  messageContent: string;
}

export interface IImage {
  _id: string;
  imageUrl: string;
  imageUrlTranslated: string;
  translatedText: string;
}

export interface IVideoChat {
  _id: string;
}

export interface IRoomJoin {
  room: string;
  name: string;
}

export interface IChatMessage {
  room: string;
  authorName: string;
  user_id: string;
  message: string;
  time: string;
}
