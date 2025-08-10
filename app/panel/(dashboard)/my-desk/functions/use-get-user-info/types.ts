
export type RawResponse = {
  full_name: string;
  id: number;
  registration_date: string;
  email: string;
  phone_number: string;
}

export type ResponseBody = {
  data: RawResponse;
}

export type TransformedResponse = {
  fullName: string;
  id: number;
  registrationDate: string;
  email: string;
  phoneNumber: string;
}

export type TransformedResponseBody = {
  data: TransformedResponse;
}