import interpolate from 'interpolate';
import {SystemWorker} from 'system-integration';
import {Parameters, TextareaParameter, InputParameter} from 'system-parameters';

export default class ShadowTree extends SystemWorker {

  parameters = new Parameters([
    // new InputParameter({name: 'name', type:'text', defaultValue: `my-component`, description: "Element name"}),
    // new InputParameter({name: 'slots', type:'number', defaultValue: `2`, description: "Element name"}),
    new TextareaParameter({name: 'template', defaultValue: ``, description: "Web Component ", rows:20 }),
  ]);

  async process(input, { template }) {
    if (typeof input !== 'string') input = JSON.stringify(input);
    const result = interpolate(template, { input }, new RegExp('{{([^}]+)}}', 'g'))
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
