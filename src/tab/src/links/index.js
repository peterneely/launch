import { getChromeLinks } from './chrome';
import { staticLinks } from './static';

const useBrowserLinks = true;

export const getLinks = () => useBrowserLinks ? getChromeLinks() : Promise.resolve(staticLinks);
