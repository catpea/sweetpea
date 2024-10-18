#!/usr/bin/env node

import AutomaticTransmission from './AutomaticTransmission.js';

const gearbox = {
  '/idle':{
    enter: () => console.log('Holla from /idle'),
    exit: () => console.log('K, bye from /idle'),
  },
  '/connected':{
    enter: () => console.log('Holla from /connected'),
    exit: () => console.log('K, bye from /connected'),
  },
  '/connected/front': {
    enter: () => console.log('Holla from /connected/front'),
    exit: () => console.log('K, bye from /connected/front'),
  },
  '/connected/front/danger': {
    enter: () => console.log('Holla from /connected/front/danger'),
    exit: () => console.log('K, bye from /connected/front/danger'),
  },
  '/connected/settings': {
    enter: () => console.log('Holla from /connected/settings'),
    exit: () => console.log('K, bye from /connected/settings'),
  },
  '/connected/worker': {
    enter: () => console.log('Holla from /connected/worker'),
    exit: () => console.log('K, bye from /connected/worker'),
  },
  '/disconnected':{
    enter: () => console.log('Holla from /disconnected'),
    exit: () => console.log('K, bye from /disconnected'),
  },
  '/error':{
    enter: () => console.log('Holla from /error'),
    exit: () => console.log('K, bye from /error'),
  },
}
const transmission = new AutomaticTransmission(gearbox, '/idle');

transmission.shift('/connected/front');
transmission.shift('/connected/front/danger');
transmission.shift('/disconnected');
