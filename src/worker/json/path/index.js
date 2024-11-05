import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

import jp from './jsonpath.min.js';

export default class JsonPath extends SystemWorker {

  queryString  = new StringParameter({defaultValue: "$.store.book[*].author", description: "JSON Path Expression" });

  async connected(){
    // this.output.alter(v=>v.showPort=false);
  }

  async process(input){
    console.warn('USING defaultValue FOR TESTING');
    return jp.query(input, this.queryString.value.defaultValue).map(value=>({value}));;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}


// import {Actor} from 'actor';
// // const jp = require('your-module-name');
//
// export default class JsonPath extends Actor {
//
//   static parameters = [
//     { name:"query",   default:'$.store.book[*].author',    type:'string', description:'the authors of all books in the store' },
//   ];
//
//   async work(parameters){
//     console.log('jsonpath', jp);
//     console.log('JsonPath parameters', parameters);
//     console.log('JsonPath query', parameters.value, parameters.query);
//     // console.log('JsonPath zbork', this.db.url.set('zbork') );
//     return jp.query(parameters.value, parameters.query).map(value=>({value}));
//   }
//
// }

/*
  EXAMPLES
  $.store.book[*].author 	the authors of all books in the store
  $..author 	all authors
  $.store.* 	all things in the store, which are some books and a red bicycle
  $.store..price 	the prices of everything in the store
  $..book[2] 	the third book
  $..book[2].author 	the third book's author
  $..book[2].publisher 	empty result: the third book does not have a "publisher" member
  $..book[-1] 	the last book in order
  $..book[0,1]
  $..book[:2] 	the first two books
  $..book[?@.isbn] 	all books with an ISBN number
  $..book[?@.price<10] 	all books cheaper than 10
  $..* 	all member values and array elements contained in the input value
*/
