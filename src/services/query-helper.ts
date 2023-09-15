export const constructQueryParams = (params: any) => {
  if (!params) return "";

  const query = new URLSearchParams();

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key].forEach((item: any) => {
        query.append(key, item);
      });
    } else {
      query.append(key, params[key]);
    }
  }
  return `?${query.toString()}`;
};

export const constructPaginationParams = (pageParam: number) => {
  const query = new URLSearchParams();

  query.append("skip", `${(pageParam - 1) * LIMIT}`);

  query.append("limit", `${LIMIT}`);

  return `?${query.toString()}`;
};

export const LIMIT = 5;
