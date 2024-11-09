import location from 'location';

import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class HttpFetch extends SystemWorker {

  url  = new StringParameter({defaultValue: "./samples/json-path-example.json", description: "Url of file to fetch." });

  async connected(){
    // this.output.alter(v=>v.showPort=false);
  }

  async process(input, {url}){
    return await this.fetchJSON(url);
  }

  normalizeURL(url){
    //NOTE: this was originally made for running tests in a sub-directory on github

    //TODO: this will need to be modified for environaments other than the web browser
    let environment = null;

    if(window.location){
      environment = 'browser';
    }else if(0){
      environment = 'gork';
    }

    switch (environment) {

      case 'browser': {
        const relativePath = !url.startsWith('http');
        if(relativePath) url = location(window.location.href) + '/' + url.replace(/^\.\//, '');
        break;
      }

      case 'browser-shell': {
        const relativePath = !url.startsWith('http');
        if(relativePath) url = location(window.location.href) + '/' + url.replace(/^\.\//, '');
        break;
      }

      default: {

      }

    } // switch (environment)

    return url;

  }

  async fetchJSON(url){
    const response = await fetch(this.normalizeURL(url));
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}


// import {Actor} from 'actor';
// import location from 'location';
//
// export default class HttpFetch extends Actor {
//
//   static parameters = [
//     { name:"url",   default:'./samples/json-path-example.json',    type:'string', description:'' },
//     { name:"retry", default:2,     type:'number', description:'' },
//     { name:"delay", default:1_000, type:'number', description:'' },
//   ];
//
//   async work(parameters){
//     console.warn('HttpFetch parameters', parameters);
//     let url = parameters.url;
//
//     // if running in sub dir on github
//     if(!url.startsWith('http')){
//       url = location(window.location.href) + '/' + parameters.url.replace(/^\.\//, '');
//     }
//
//     const response = await fetch(parameters.url);
//     if (!response.ok) throw new Error(`Response status: ${response.status}`);
//     return await response.json();
//
//   }
//
// }
