export const totalLinks = (links) => links.length;
export const uniqueLinks = (links) => {
  return new Set(links.map((link) => link.href)).size;
};
export const brokenLinks = (links) =>
  links.filter((link) => link.statusCode === 404).length;