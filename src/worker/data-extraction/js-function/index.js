import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class ScriptFunction extends SystemWorker {

  script   = new EnumParameter({enumeratedMembers:[{value:'dir', name:'Messge of dir type', selected:true}, {value:'log', name:'Messge of log type'}, {value:'debug', name:'Messge of debug type'}, {value:'info', name:'Messge of info type'}, {value:'warn', name:'Messge of warn type'}], description: "Console type options: dir, log, debug, info, warn. Determines the type of console message. Default is 'dir'." });

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


// import {Actor} from 'actor';
//
// export default class ScriptFunction extends Actor {
//
//   static parameters = [
//     { name:"script",   default:'()=>{}',    type:'string', description:'JavaScript Function' },
//   ];
//
//   async work(parameters){
//     return console[parameters.type](parameters.input);
//   }
//
// }
