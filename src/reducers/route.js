const routes = (state = 'REGISTER_CARDS', action) => {
  switch (action.type) {
    case 'NAVIGATE':
        return action.payload.toRoute;
    default:
      return state;
  }
};

export default routes