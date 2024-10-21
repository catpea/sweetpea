import {Worker} from 'actor';

export default class httpFetch extends Worker {

  static options = [
    {name:"retry", default:2, delay:1_000},
  ];

  async process(job, options){

    try {

      const response = await fetch(job.url);
      job.progress = .5;

      if (!response.ok) {
        job.progress = 0;
        job.error = `Response status: ${response.status}`;
        return;
      }

      const result = await response.json();

      job.progress = 1;
      job.value = result;

    } catch (error) {
      job.progress = 0;
      job.error = error.message;
    }

  }

}
