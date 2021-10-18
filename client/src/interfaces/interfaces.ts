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
