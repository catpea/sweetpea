import Signal from 'signal';

class Parameter extends Signal {
  #default = {
    description: "Parameter does not have a description",
    defaultValue: null,
    portDirection: "left",
    showPort: true,
    enumeratedMembers: [],
  };
  constructor(setup){
    super(Object.assign({},this.#default,setup)); // assigns signal value,
  }
}


export class EnumParameter extends Parameter {
  constructor(setup){
    super(setup);
  }
  get selected(){
    return this.value.enumeratedMembers.find(m=>m.selected)?.value;
  }
}

export class StringParameter extends Parameter {}
export class PortParameter extends Parameter {}

export default { EnumParameter, StringParameter, PortParameter }
