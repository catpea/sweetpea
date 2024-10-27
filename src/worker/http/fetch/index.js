import {Actor} from 'actor';
import location from 'location';

export default class HttpFetch extends Actor {

  static parameters = [
    { name:"url",   default:'./samples/json-path-example.json',    type:'string', description:'' },
    { name:"retry", default:2,     type:'number', description:'' },
    { name:"delay", default:1_000, type:'number', description:'' },
  ];

  async work(parameters){
    console.warn('HttpFetch parameters', parameters);
    let url = parameters.url;

    // if running in sub dir on github
    if(!url.startsWith('http')){
      url = location(window.location.href) + '/' + parameters.url.replace(/^\.\//, '');
    }

    const response = await fetch(parameters.url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();

  }

}
