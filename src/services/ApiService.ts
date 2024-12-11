export const fetchData = async <T>(
  url: string,
  body: unknown = {},
  method: string = 'GET',
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method,
      body: method === 'POST' ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const { ok } = response;

    if (!ok) {
      throw new Error('Failed to fetch data');
    }

    return data;
  } catch (err) {
    throw err;
  }
};
