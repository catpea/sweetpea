#!/usr/bin/env node


const states = {

  foo fire primary IDLE: {},
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


console.log(states);
