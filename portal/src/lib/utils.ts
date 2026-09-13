export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Prefix asset paths for GitHub Pages basePath in static export.
 * next/link and next/image handle basePath automatically for routes;
 * use this for raw <a href> to public files when needed.
 */
export function assetPath(path: string): string {
  const base =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_BASE_PATH ?? ""
      : "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
