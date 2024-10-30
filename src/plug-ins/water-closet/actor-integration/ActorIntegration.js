import location from 'location';
import masticator from 'masticator';
import {Actor} from 'actor';
import EventEmittter from 'event-emitter';

export default Inheritance => class ActorIntegration extends Inheritance {
  actor;
  View;

  async createActor({attribute}={attribute:"worker"}){


    const setup = {
      id: this.host.getAttribute('id'),

      options: { ...this.host.dataset }, //TODO: don't use dataset use signals...

      stage: this.getStage().actor,
      // stage:  document.querySelector('x-stage') .actor,
      // stage: new EventEmittter(),
      // db: this.getStage().instance.db,

      worker: this.worker,
      queue: this.queue,
      buffer: this.buffer,
    }

    let workerPath = this.host.getAttribute(attribute);
    // //console.log('TIME TRAVEL ERROR, stage is a fake emitter, becasue element may not be in DOM yet, this fixes not being able to connect tnodes but destroys calling stage .start!');
    //console.log('TIME TRAVEL ERROR, stage not available element may not be in DOM yet, USING document.querySelector("x-stage") .actor');
    if(workerPath){
      const {default: Actor} = await import(`${location(window.location.href)}/src/worker/${workerPath}/index.js`);
      this.actor = new Actor(setup);
    }else{
      this.actor = new Actor(setup);
    }

    return this;
  }

  async installSupervisorTemplate({attribute}={attribute:"supervisor"}){
    let supervisorPath = this.host.getAttribute(attribute);
        let url = `${location(window.location.href)}/src/supervisor/${supervisorPath}/view.html`;
    let html;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
      html = await response.text(); // Get the response text
    } catch (error) {
      //console.error('There was a problem with the fetch operation:', error);
    }
    const templateContainer = document.createElement('template');
    templateContainer.innerHTML = html;
    this.template = templateContainer.content.cloneNode(true);
    return this;
  }

  async installSupervisorCSS({attribute}={attribute:"supervisor"}){
    let supervisorPath = this.host.getAttribute(attribute);

    const list = [`${location(window.location.href)}/src/supervisor/${supervisorPath}/style.css`];
    for (const url of list) {
      const response = await fetch(url);
      const str = await response.text();
      const css = new CSSStyleSheet();
      css.replaceSync(str);
      this.host.shadowRoot.adoptedStyleSheets = [...this.host.shadowRoot.adoptedStyleSheets, css];
    }
  }

  async installSupervisorView({attribute}={attribute:"supervisor"}){
    let supervisorPath = this.host.getAttribute(attribute);

  const {
      default: View,
      foo,
      bar,
    } = await import(`${location(window.location.href)}/src/supervisor/${supervisorPath}/View.js`);
    this.View = View;
    return this;
  }


}
