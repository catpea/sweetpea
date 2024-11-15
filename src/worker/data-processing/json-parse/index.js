import {SystemWorker} from 'system-integration';
import {Parameters, StringParameter} from 'system-parameters';

export default class JsonParse extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name: 'json', defaultValue: `{"url":"example.com"}`, description: "JSON Object" }),
  ]);

  async process(input, {json}){
    const result = JSON.parse(json);
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
