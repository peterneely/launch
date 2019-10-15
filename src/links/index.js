import { getChromeLinks } from './chrome';
import { domainLinks, sortedLinks } from './static';

const useBrowserLinks = true;

export const getLinks = ({ sorted = true } = {}) => useBrowserLinks ? getChromeLinks(sorted) : Promise.resolve(sorted ? sortedLinks : domainLinks);
