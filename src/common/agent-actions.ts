const actions = {
  MOVE: {},
  REST: {
    mp: 2,
    turns: 2,
    effect: {
      target: 'self',
    },
  },
};

export const getAgentActions = () => actions;
