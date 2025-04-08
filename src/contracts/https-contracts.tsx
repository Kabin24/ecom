export interface IImagedata {
  url: string;
  optimizedUrl: string;
}

export type IGetAllDataWithFilter = {
  page?: number;
  limit?: number;
  search?: string | null;
};
export type PaginationType = {
  total?: number;
  pageSize?: number;
  current?: number;
};
