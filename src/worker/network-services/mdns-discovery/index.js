const os = require('node:os');

import location from 'location';
import mdns from './sweetpea-mdns.js';

import {SystemWorker} from 'system-integration';
import {Parameters, StringParameter, PortParameter} from 'system-parameters';

const browser = Symbol("browser");
const service = Symbol("service");
export default class MdnsDiscovery extends SystemWorker {

  [browser];
  [service];

  parameters = new Parameters([
    new StringParameter({name:'url', defaultValue: "./samples/json-path-example.json", description: "Url of file to fetch." }),
    new PortParameter({name:'update',   enabled: true, direction: 'out', description: "Service update" }),
    new PortParameter({name:'up',   enabled: true, direction: 'out', description: "Service up" }),
    new PortParameter({name:'down', enabled: true, direction: 'out', description: "Service down" }),
  ]);

  async test_start(){
    this[browser] = mdns.createBrowser();
    this.input.alter(v=>v.showPort=false);
    this.output.alter(v=>v.showPort=false);
    console.log('CCC', this.output.showPort);


    this[service] = mdns.createAdvertisement(mdns.tcp('_http'), 6666, {
      name: os.hostname(),
      txt:{
        host: os.hostname(),
        port:'6666'
      }
    });

    // The TXT record is typically used to convey:
    // Service-specific parameters: Information needed by clients to correctly interact with the service.
    // Configuration settings: Such as user preferences or authentication keys, depending on the service.
    // Status or version information: To indicate which version of the service is being provided, or to communicate other status-related details.


    setTimeout(() => {
    this[service].start();
    console.log('START');

    }, 10_000)
    this[browser].on('ready', function () {
      console.log('ready');

        this[browser].discover();
    });
    this[browser].on('update', function (data) {
      console.log('update');

        console.log('data:', data);

    });

  }

  stop(){
    this[service].stop();
  }

  async process(input, parameters){

    this[browser].on('ready', function () {
        this[browser].discover();
    });
    this[browser].on('update', function (data) {
        console.log('data:', data);
        this.actor.send('update', data );
    });

  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
