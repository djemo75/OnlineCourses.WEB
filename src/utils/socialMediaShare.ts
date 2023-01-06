export const getFacebookShareUrl = (url: string, title: string) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
};

export const getTwitterShareUrl = (url: string, title: string) => {
  return `https://twitter.com/share?url=${url}&text=${title}`;
};
