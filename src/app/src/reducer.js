const initialState = {};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    default:
      return state;
  }
};
