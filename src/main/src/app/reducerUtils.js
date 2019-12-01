export const clearErrors = ({ key, state }) => {
  const { errors: { [key]: errorsToRemove, ...restErrors } = {} } = state;
  return restErrors;
};

export const setError = ({ key, state, payload }) => {
  const { errors } = state;
  const { error } = payload;
  return { ...errors, [key]: [...(errors[key] || {}), error] };
};

