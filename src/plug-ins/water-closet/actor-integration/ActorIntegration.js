import location from 'location';
import masticator from 'masticator';
import {Actor} from 'actor';

export default Inheritance => class ActorIntegration extends Inheritance {
  actor;
  View;

  async createActor({attribute}={attribute:"worker"}){


    const setup = {
      options: { ...this.host.dataset },
      stage: this.getStage().actor,
      worker: this.worker,
      queue: this.queue,
      buffer: this.buffer,
    }

    let workerPath = this.host.getAttribute(attribute);

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
      console.error('There was a problem with the fetch operation:', error);
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
