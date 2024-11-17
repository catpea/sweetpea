import Signal from 'signal';
import DataStore from './Store.js';

export default function main (el){

  const dataStore = new DataStore(el);

  return new Proxy(dataStore, {
    get(dataStore, key) {
      if (key === 'destroy') return ()=>dataStore.destroy();
      if (key === 'parameters') return dataStore.parameters();
      return dataStore.getSignal(key);
    },
    set(dataStore, key, value) {
      dataStore.updateSignal(key, value);
    },
  });

} // main
