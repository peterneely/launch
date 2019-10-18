import { getChromeLinkConfigs } from './chrome';
import { domainLinkConfigs, sortedLinkConfigs } from './static';

const useBrowser = true;

export const getLinkConfigs = ({ sorted = true } = {}) => useBrowser ? getChromeLinkConfigs(sorted) : Promise.resolve(sorted ? sortedLinkConfigs : domainLinkConfigs);
