import {Worker} from 'actor';

export default class httpFetch extends Worker {

  static parameters = [
    { name:"url",   default:'./samples/json-path-example.json',    type:'String', description:'' },
    { name:"retry", default:2,     type:'Number', description:'' },
    { name:"delay", default:1_000, type:'Number', description:'' },
  ];

  async work(parameters){
    let url = parameters.url;

    // if running in sub dir on github
    if(!url.startsWith('http')){
      const currentUrl = new URL(window.location.href);
      url = currentUrl.pathname + parameters.url.replace(/^\.\//, '');
    }

    const response = await fetch(parameters.url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();

  }

}
