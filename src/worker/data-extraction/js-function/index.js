import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class ScriptFunction extends SystemWorker {

  script   = new StringParameter({defaultValue: `input=>{input}`, description: "JavaScript Function" });

  async connected(){
    // this.output.alter(v=>v.showPort=false);
  }

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
