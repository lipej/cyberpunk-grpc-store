const reg = /[a-zA-Z]/g;
export const checkFields = (value: string) => reg.test(value);