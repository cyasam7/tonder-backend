type tplotOptions = {
  [key: string]: string;
};
export const enviroments: tplotOptions = {
  dev: '.env.development',
  prod: '.env.production',
};

export const isDev = process.env.NODE_ENV === 'dev' ? true : false;
