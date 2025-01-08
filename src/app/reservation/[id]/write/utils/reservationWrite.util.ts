export const generateCustomerKey = async (userId: number): Promise<string> => {
  const rawData = `HANDYBUS_USER_${userId}_TOSS_PAYMENTS_KEY`;
  const encoder = new TextEncoder();
  const data = encoder.encode(rawData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const base64Hash = btoa(
    hashArray.map((b) => String.fromCharCode(b)).join(''),
  );
  console.log(
    'generateCustomerKey',
    `USER_${userId}_${base64Hash.slice(0, 40).replace(/[^A-Za-z0-9\-_=.@]/g, '_')}`,
  );
  return `USER_${userId}_${base64Hash
    .slice(0, 40)
    .replace(/[^A-Za-z0-9\-_=.@]/g, '_')}`;
};
