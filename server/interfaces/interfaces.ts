export interface IntUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IntTranslator {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  averageRating: string;
}

export interface IntJob {
  _id: string;
  status: string;
  languageFrom: string;
  languageTo: string;
  jobType: string;
  dateCompleted: Date;
  jobName: string;
}

export interface IntLanguage {
  _id: string;
  languageName: string;
}
