
import links from "../config/links";

export const getPageTitle = (locationName, currentPet) => {
  const dynamicRouteMatch = locationName.match(/^\/pets\/([^/]+)$/);
  if (dynamicRouteMatch) {
    return currentPet ? currentPet.name : 'Pet Details';
  }

  const currentLink = links.find(link => link.path === locationName);
  return currentLink ? currentLink.name : '';
};