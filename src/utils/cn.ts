import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/** 
    Berguna untuk mengutilize class di tailwind
*/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}