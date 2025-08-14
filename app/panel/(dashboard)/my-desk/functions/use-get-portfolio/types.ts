
export type RawResponse = {
  asset: string,
  id: number,
  last_price: number,
  close_price: number,
  count: number,
}

export type ResponseBody = {
  data: RawResponse[];
}

export type TransformedResponse = {
  asset: string,
  id: number,
  lastPrice: number,
  closePrice: number,
  count: number,
}

export type TransformedResponseBody = {
  data: TransformedResponse[];
}