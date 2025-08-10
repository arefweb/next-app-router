
export type RawResponse = {
  first_name: string;
  last_name: string;
}

export type ResponseBody = {
  data: RawResponse[];
}

export type TransformedResponse = {
  firstName: string;
  lastName: string;
  fullName: string;
}

export type TransformedResponseBody = {
  entities: TransformedResponse[];
}