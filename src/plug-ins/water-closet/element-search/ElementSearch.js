export default Inheritance => class ElementSearch extends Inheritance {


  searchShadow(selector='*'){
    console.log(this.host.shadowRoot);
    return this.search(selector, {shadow:true, dom:false});
  }

  search(selector='*', {shadow, dom}={shadow:true, dom:true}){
    const matches = [];

    if(shadow){
      const root = this.host.shadowRoot;

      const elements = root.querySelectorAll(selector);
      for (const element of elements) {
        const parents = this.collectParents(element, root);
        const isOutermost = this.isOutermostElement(parents);
        if(!isOutermost) continue; // only interested in outermost
        matches.push(element)
      }
    }

    if(dom){
      const root = this.host;

      const elements = root.querySelectorAll(selector);
      for (const element of elements) {
        const parents = this.collectParents(element, root);
        const isOutermost = this.isOutermostElement(parents);
        if(!isOutermost) continue; // only interested in outermost
        matches.push(element)
      }
    }

    return matches;
  }

  findOut(element, selector) {
      let parent = this.getParent(element);
      let c = 0;
      while (parent && parent !== document   ) {
        if (parent.matches && parent.matches(selector)) return parent;
        if (c++>100) {
          break;
        }
        parent = this.getParent(parent);
      }
      return null;
  }

  getStage(){
    let response = null;
    if(this.host.tagName.toLowerCase() == `${globalThis.sweetpea.prefix}-stage`){
      response =  this.host;

    }else{
      // response = upwards(this.host, `${globalThis.sweetpea.prefix}-stage`).pop();
      response = this.findOut(this.host, `${globalThis.sweetpea.prefix}-stage`);

    }
    return response;
  }

  // getApplication(){
  //   let response = null;
  //
  //   if(this.host.tagName.toLowerCase() == 'data-root'){
  //     response =  this.host;
  //   }else{
  //     response = upwards(this.host, 'data-root').pop();
  //
  //   }
  //
  //   /////////console.log(`${this.host.tagName} getApplication()`, response);
  //
  //   return response;
  // }


    collectParents(element, root) {
        const parents = [];

        let parent = this.getParent(element);
        let c = 0;
        while (parent && parent !== document && parent !== root) {
          if (c++>100) {
            break;
          }
          parents.push(parent);
          parent = this.getParent(parent);
        }
        return parents;
    }

    isOutermostElement(parents) {

        const hasInnerDataTag = !!parents.map(p => p.tagName).find(tag => tag.startsWith(globalThis.sweetpea.prefix + '-'));
        return !hasInnerDataTag;
    }

    getParent(element){
      let parent;

      if(element.parentNode){
        parent = element.parentNode;
      }else if(element instanceof ShadowRoot){
        parent = element.host;
      }
      // else if(element.host){
      //   parent = element.host;
      // }
      return parent;
    }



}
