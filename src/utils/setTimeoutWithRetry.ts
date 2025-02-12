/* eslint-disable @typescript-eslint/no-explicit-any */
export const setTimeoutWithRetry = (
  fn: () => Promise<any>,
  maxRetries: number,
  delay: number,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let tries = 0;

    const attempt = () => {
      fn()
        .then(resolve)
        .catch((error) => {
          tries++;
          if (tries < maxRetries) {
            setTimeout(attempt, delay);
          } else {
            reject(error);
          }
        });
    };

    attempt();
  });
};
