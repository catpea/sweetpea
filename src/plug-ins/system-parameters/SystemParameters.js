import Signal from 'signal';

export class Parameter extends Signal {

  constructor(setup){
    const defaults = {
      description: "Parameter does not have a description",
      defaultValue: null,
      portDirection: "left",
      showPort: true,
      enumeratedMembers: [],
    }
    super(Object.assign({},defaults,setup)); // assigns signal value,
  }
}


// get selected(){ return this.value.enumeratedMembers.find(m=>m.selected)?.value; }

export class EnumParameter extends Parameter { }
export class StringParameter extends Parameter {}
export class PortParameter extends Parameter {}
export default { Parameter, EnumParameter, StringParameter, PortParameter }