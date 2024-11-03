import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class DeveloperConsole extends SystemWorker {

  consoleType   = new EnumParameter({enumeratedMembers:[{value:'dir', text:'Messge of dir type', selected:true}, {value:'log', text:'Messge of log type'}, {value:'debug', text:'Messge of debug type'}, {value:'info', text:'Messge of info type'}, {value:'warn', text:'Messge of warn type'}], description: "Console type options: dir, log, debug, info, warn. Determines the type of console message. Default is 'dir'." });
  templateText  = new StringParameter({defaultValue: "Data %s", description: "Console type options: dir, log, debug, info, warn. Determines the type of console message. Default is 'dir'." });

  async connected(){
    outputPort.alter(v=>v.showPort=false);
  }

  async process(input){
    result = input;
    console[this.consoleType].bind(console)(input);
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
