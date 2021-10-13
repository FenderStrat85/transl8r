export interface IntUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  averageRating?: number;
}
export interface IntCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface IntTranslator {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  averageRating: string;
}

export interface IntJob {
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

export interface IntLanguage {
  _id: string;
  languageName: string;
}

export interface IntConversation {
  _id: string;
}

export interface IntMessage {
  _id: string;
  messageAuthor: string;
  messageContent: string;
}

export interface IntImage {
  _id: string;
  imageUrl: string;
}

export interface IntVideoChat {
  _id: string;
}
