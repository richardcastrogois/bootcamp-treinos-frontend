//frontend/app/_lib/fetch.ts
import { cookies } from "next/headers";

const getBody = async <T>(response: Response): Promise<T> => {
  return response.json() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const newUrl = new URL(contextUrl, process.env.NEXT_PUBLIC_API_URL);
  return newUrl.toString();
};

const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const cookieStore = await cookies();

  return {
    ...headers,
    cookie: cookieStore.toString(),
  };
};

type ExtractResponseData<T> = T extends { data: infer Data } ? Data : never;

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const response = await fetch(requestUrl, {
    ...options,
    headers: requestHeaders,
  });

  const data = await getBody<ExtractResponseData<T>>(response);

  return {
    status: response.status,
    data,
    headers: response.headers,
  } as T;
};
