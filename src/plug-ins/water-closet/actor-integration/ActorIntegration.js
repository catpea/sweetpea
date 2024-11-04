import location from 'location';
import masticator from 'masticator';
import EventEmittter from 'event-emitter';
import Signal from 'signal';
import signalMerge from 'signal-merge';


export default Inheritance => class ActorIntegration extends Inheritance {

  View;

  async installSupervisorTemplate({attribute}={attribute:"supervisor"}){
    // let supervisorPath = this.host.getAttribute(attribute);
    //     let url = `${location(window.location.href)}/src/supervisor/${supervisorPath}/view.html`;
    // let html;
    // try {
    //   const response = await fetch(url);
    //   if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
    //   html = await response.text(); // Get the response text
    // } catch (error) {
    //   //console.error('There was a problem with the fetch operation:', error);
    // }
    // const templateContainer = document.createElement('template');
    // templateContainer.innerHTML = html;
    // this.template = templateContainer.content.cloneNode(true);
    // return this;

    // console.log(this.getStage().instance);
    // console.log(this.getStage().instance.theme);
    this.template = this.getStage().instance.theme.template('supervisor-interface');

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
