export interface FindByEmailAndName {
  email: string;
  name: string;
}

export interface FindByContent {
  content: string;
}

export type FindUserParams = FindByEmailAndName | FindByContent;
