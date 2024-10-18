#!/usr/bin/env node


const states = {
  IDLE: {},
  LOADING: {
    FRONT:{},
    SETTINGS:{
      VALID:{},
      INVALID:{},
    },
  },
  CONNECTED:{},
  DISCONNECTED:{},
};

const map = `
  IDLE
  LOADING
    FRONT
    SETTINGS
      VALID
      INVALID
  CONNECTED
  DISCONNECTED
`;

console.log(states);
