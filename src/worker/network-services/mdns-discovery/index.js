import location from 'location';

import {SystemWorker} from 'system-integration';
import {Parameters, StringParameter, PortParameter} from 'system-parameters';

export default class MdnsDiscovery extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name:'url', defaultValue: "./samples/json-path-example.json", description: "Url of file to fetch." }),
    new PortParameter({name:'up',   enabled: true, direction: 'out', description: "Service up" }),
    new PortParameter({name:'down', enabled: true, direction: 'out', description: "Service down" }),
  ]);

  async start(){
    this.input.alter(v=>v.showPort=false);
    this.output.alter(v=>v.showPort=false);
    console.log('CCC', this.output.showPort);

  }

  async process(input, parameters){

  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
