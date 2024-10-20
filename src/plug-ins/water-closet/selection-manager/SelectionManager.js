export default Inheritance => class SelectionManager extends Inheritance {
  //NOTE: selected can be "true" (string) or null (property removed [helps with serialization])

  selected(selected){
    const container = this.searchShadow('.perspective').pop();

    if(selected === "true"){
      this.deselectAll();
      for (const element of container.querySelectorAll('.card')) {
        element.classList.add('selected');
      }
    }else{
      // console.log('DE-SELECTED', this.host);
      for (const element of container.querySelectorAll('.card')) {
        element.classList.remove('selected');
      }
    }


  }

  select(){
    this.getStage()
  }

  deselectAll(){

    for (const element of this.getStage().querySelectorAll(`${globalThis.sweetpea.prefix}-super`)) {
      if(this.host.getAttribute('id') == element.getAttribute('id')) continue;
      element.setAttribute('selected', "false");
    }

  }
}
