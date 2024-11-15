import { SystemWorker } from 'system-integration';
import { Parameters, StringParameter } from 'system-parameters';

export default class ScriptFunction extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name: "script", defaultValue: `input=>{input}`, description: "JavaScript Function" }),
  ]);

  async process(input, {script}){
    const result = Function(`return ${script}`)();
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
