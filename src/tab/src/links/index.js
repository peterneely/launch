import { getChromeLinks } from './chrome';
import { sortedLinks } from './static';

const useBrowserLinks = true;

export const getLinks = () => useBrowserLinks ? getChromeLinks() : Promise.resolve(sortedLinks);
