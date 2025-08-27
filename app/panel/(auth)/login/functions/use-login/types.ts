export type FormInputTypes = {
  email: string,
  password: string,
}

export type RawResponse = {
  id: number,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string,
}

export type ResponseBody = {
  data: RawResponse;
}