import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = '/mvu-website';

  if (!isProd) return path;
  if (!path) return '';

  // Prevent double prefixing
  if (path.startsWith(basePath)) return path;

  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
