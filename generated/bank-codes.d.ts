declare module 'bank-codes.json' {
  const bankCodes: {
    [key: string]: {
      code: string;
      name: string;
    };
  };
  export default bankCodes;
}
