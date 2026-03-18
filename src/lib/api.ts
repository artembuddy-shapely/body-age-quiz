// TODO: Implement typed HTTP client for backend service calls.
// BACKEND_API_URL should be set in .env.local

export async function post<T>(_path: string, _body: unknown): Promise<T> {
  throw new Error("Backend API not yet configured");
}
