import isColor from 'is-color';
import uniq from 'lodash/uniq';

export const cleanJson = jsonString =>
  jsonString
    .replace(/\\n/g, '\\n')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, '\\&')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t')
    .replace(/\\b/g, '\\b')
    .replace(/\\f/g, '\\f');

export const getDomain = url => {
  const matches = url.match(/^https?:\/\/([^/:?#]+)(?:[/:?#]|$)/i);
  return matches ? matches[1] : url;
};

export const isValidColor = color => isColor(color);

export const toClassNames = (...strings) =>
  uniq(strings)
    .filter(string => string)
    .join(' ');
