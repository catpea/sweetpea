import {SystemWorker} from 'system-integration';
import {Parameters, EnumParameter, StringParameter} from 'system-parameters';

export default class DeveloperConsole extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name: 'text', defaultValue: ``, description: "Text prefix/template." }),
    new EnumParameter({name: 'context', enumeratedMembers:[{value:'dir', name:'dir'}, {value:'log', name:'log'}, {value:'debug', name:'debug'}, {value:'info', name:'info', selected:true}, {value:'warn', name:'warn'}], description: "Console type options: dir, log, debug, info, warn. Determines the type of console message. Default is 'dir'." }),
  ]);

  async start(){
    this.output.alter(v=>v.showPort=false);
  }

  async process(input, {text, context}){
    const result = input;
    console[context].bind(console)(text, input);
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
