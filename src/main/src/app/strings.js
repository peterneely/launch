export const getDomain = url => {
  const matches = url.match(/^https?:\/\/([^/:?#]+)(?:[/:?#]|$)/i);
  return matches ? matches[1] : url;
};

export const isValidJson = text => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

export const toClassNames = (...strings) => strings.filter(string => string).join(' ');
