export interface Answer {
  profileImage?: string;
}

export interface User {
  name: string;
  profileImage: string | null;
  answers: Answer[];
}
