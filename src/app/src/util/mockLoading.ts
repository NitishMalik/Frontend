export const mockLoading = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('success'), 1500);
  });
};
