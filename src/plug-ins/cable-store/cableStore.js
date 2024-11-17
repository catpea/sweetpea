import Signal from 'signal';
import CableStore from './Store.js';

export default function main (el){
  const cableStore = new CableStore(el);
  return new Proxy(cableStore, {
    get(cableStore, portName) {
      if (portName === 'destroy') return ()=>cableStore.destroy();
      return cableStore.getCable(portName);
    },
  });
} // main
