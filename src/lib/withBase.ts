export function withBase(baseUrl: string, path: string): string {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const target = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${target}`;
}
