export interface ProductI {
  title: string;
  description: string;
  params: object;
}

export interface ProductParamI {
  title: string;
  description: string;
  value: string;
  require?: boolean;
}