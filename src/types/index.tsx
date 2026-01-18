export type Category =
  | "Preposition"
  | "Conjunction"
  | "Phrasal verb"
  | "Functional phrase"
  | "Verb"
  | "Participle"
  | "Noun"
  | "Adjective"
  | "Pronoun"
  | "Numerals"
  | "Adverb"
  | "All categories";
  
export const VALID_CATEGORIES: Category[] = [
  "Verb",
  "Participle",
  "Noun",
  "Adjective",
  "Pronoun",
  "Numerals",
  "Adverb"
];

export interface Word {
  _id: number;
  original: string;
  translation: string;
  progress: number;
  categories: Category[];
  owner: number;
  isRegular: boolean;
}
export interface WordState {
  words: Word[];
  categories: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  verify: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}
