import { Dev } from "./devs";

export interface Plugin {
  name: string;
  description: string;
  author: Dev[];
  execute: () => void | Promise<void>;
  required_for_startup?: boolean; // note: only applies to internal.ts
}
