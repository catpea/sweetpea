import macro from 'async-macro';

export default Inheritance => class Macro extends Inheritance {

  get macro() {
    return macro(this);
  }

}
