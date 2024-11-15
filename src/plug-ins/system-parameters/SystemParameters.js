import Signal from 'signal';

export class Parameters extends Signal { }

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

export class StringParameter extends Parameter {
}

export class TextParameter extends Parameter {
  constructor(setup){
    const defaults = {
      rows: 5,
    }
    super(Object.assign({},defaults,setup)); // assigns signal value,
  }
}
export class InputParameter extends Parameter {
  constructor(setup){
    const defaults = {
      type: 'input',
    }
    super(Object.assign({},defaults,setup)); // assigns signal value,
  }
}

export class PortParameter extends Parameter {}
export class EventParameter extends Parameter {}
export default { Parameter, EnumParameter, StringParameter, PortParameter, EventParameter }
