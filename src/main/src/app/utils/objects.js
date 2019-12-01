import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import unset from 'lodash/unset';

export const assignPath = ({ object, path, value }) => {
  const clonedObject = cloneDeep(object);
  set(clonedObject, path, value);
  return clonedObject;
};

export const removePath = ({ object, path }) => {
  const clonedObject = cloneDeep(object);
  unset(clonedObject, path);
  return clonedObject;
}

