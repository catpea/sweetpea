import location from 'location';
import masticator from 'masticator';
import EventEmittter from 'event-emitter';
import Signal from 'signal';
import signalMerge from 'signal-merge';


export default Inheritance => class ActorIntegration extends Inheritance {

  View;

  async installSupervisorTemplate({attribute}={attribute:"supervisor"}){
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
    const { default: View } = await import(`${location(window.location.href)}/src/supervisor/${supervisorPath}/View.js`);
    this.View = View;
    return this;
  }






}
