import Signal from 'signal';

export default function signalMerge(signals, subscriptions){

  const initialize = {};
  for (const signalName in signals) {
    console.log('XXX', signalName);
    initialize[signalName] = signals[signalName].value;
  }
  console.log('XXX', initialize);

  const merged = new Signal(initialize);

  for (const signalName in signals) {
    const subscription = signals[signalName].subscribe(v=>{
      merged.alter(m => m[signalName] = v );
    });
    subscriptions.push( {type:'signal-merge-internal', id:signalName, subscription} );
  }

  return merged;
}
