import location from 'location';
import ThemeReader from 'theme-reader';

export default Inheritance => class Theme extends Inheritance {
  theme;
  async loadTheme({attribute}={attribute:"theme"}){
    let themeName = this.host.getAttribute(attribute);
    let url = `${location(window.location.href)}/src/theme/${themeName}/theme.html`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
    const htmlString = await response.text(); // Get the response text
    this.theme = new ThemeReader(htmlString);
  }
}
