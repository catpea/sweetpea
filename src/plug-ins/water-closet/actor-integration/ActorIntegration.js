import masticator from 'masticator';

export default Inheritance => class ActorIntegration extends Inheritance {
  View;


  async installSupervisorTemplate({attribute}={attribute:"supervisor"}){
    let location = this.host.getAttribute(attribute);
    const currentUrl = new URL(window.location.href);
    let url = `${currentUrl.pathname}src/supervisor/${location}/view.html`;
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
    let location = this.host.getAttribute(attribute);

    const currentUrl = new URL(window.location.href);
    const list = [`${currentUrl.pathname}src/supervisor/${location}/style.css`];
    for (const url of list) {
      const response = await fetch(url);
      const str = await response.text();
      const css = new CSSStyleSheet();
      css.replaceSync(str);
      this.host.shadowRoot.adoptedStyleSheets = [...this.host.shadowRoot.adoptedStyleSheets, css];
    }
  }

  async installSupervisorView({attribute}={attribute:"supervisor"}){
    let location = this.host.getAttribute(attribute);

    const currentUrl = new URL(window.location.href);

  const {
      default: View,
      foo,
      bar,
    } = await import(`${currentUrl.pathname}src/supervisor/${location}/View.js`);
    this.View = View;
    return this;
  }


}
