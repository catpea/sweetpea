import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class DeveloperConsole extends SystemWorker {

  consoleType   = new EnumParameter({enumeratedMembers:[{value:'dir', name:'Messge of dir type', selected:true}, {value:'log', name:'Messge of log type'}, {value:'debug', name:'Messge of debug type'}, {value:'info', name:'Messge of info type'}, {value:'warn', name:'Messge of warn type'}], description: "Console type options: dir, log, debug, info, warn. Determines the type of console message. Default is 'dir'." });
  // templateText  = new StringParameter({defaultValue: "Data %s", description: "Console type options: dir, log, debug, info, warn. Determines the type of console message. Default is 'dir'." });

  async connected(){
    this.output.alter(v=>v.showPort=false);
  }

  async process(input){
    const result = input;
    console.warn('USING DIR FOR TESTING');

    console['dir'].bind(console)(input);
    // console[this.consoleType.value].bind(console)(input);
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
