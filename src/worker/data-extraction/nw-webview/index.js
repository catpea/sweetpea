// https://developer.chrome.com/docs/apps/reference/webviewTag#type-InjectDetails

import { SystemWorker } from 'system-integration';
import { Parameters, StringParameter, TextareaParameter } from 'system-parameters';

const defaultScript = `
let prices = [];

// Example: scrape all <h2> elements with the class "article-title"
let priceElements = document.querySelectorAll('.card-title.pricing-card-title');

priceElements.forEach((element) => {
  prices.push(element.textContent.trim());
});

prices;
`;
export default class ScriptFunction extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name:'src', defaultValue: "https://getbootstrap.com/docs/5.3/examples/pricing/", description: "Url of file to fetch." }),
    new TextareaParameter({name: "js", defaultValue: defaultScript.trim(), description: "JavaScript Function", rows:8 }),
  ]);

  // async connect(){
  //   await super.connect();
  //   this.gc = this.stage.on('start', message => {
  //   });
  //   this.gc = this.stage.on('stop', message => {
  //   });
  //   this.gc = actor.on('input', input => {
  //   });
  // }

  async process(input, {src, js}){

    if(!this.webview){ // WEB VIEW SHOULD BE DESTROYED EACH TIME - IN AND OUT - AND BE DONE
      this.webview = document.createElement('webview');
      document.body.appendChild(this.webview);
      // this.gc = this.stage.on('stop', () => {
      //   this.webview.remove();
      //   this.webview = null;
      // });
    }



    if (this.webview.getAttribute('src') !== src) {
      this.webview.setAttribute('src', src);
    } else {
      this.webview.reload();
    }

    const remoteDomReady = new Promise(resolve => {
      // Wait for webview to load the page
      console.log('this.webview', this.webview);

      this.webview.addEventListener('loadstop', () => {
        console.log('Webview loaded!');
        resolve(this);
      });

    });
    const readyInfo = await remoteDomReady;
    console.log(readyInfo);

    const scriptAvailability = new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (this.webview.executeScript) {
          console.log('executeScript ready', this.webview.executeScript);
          clearInterval(intervalId)
          resolve(this);
        }else{
          console.log('Waiting...');

        }
      }, 1000)
    });

    await scriptAvailability;

    console.log('this.webview', this.webview);
    console.log('Executing', js);




    const scriptExecution = new Promise((resolve,reject) => {
      try {
        this.webview.executeScript({code: js}, result => resolve(result));
      } catch (e) {
        reject(e)
      }
    });

    const result = await scriptExecution;
    console.log('RESULT', result.flat(1));


    this.webview.remove();
    this.webview = null;

    return result.flat(1);
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
