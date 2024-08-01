
import links from "../config/links";

export const getPageTitle = (locationName) => {
  const currentLink = links.find(link => link.path === locationName);
  return currentLink ? currentLink.name : '';
};