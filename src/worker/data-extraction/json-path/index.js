import { SystemWorker } from 'system-integration';
import { Parameters, StringParameter } from 'system-parameters';

import jp from './jsonpath.min.js';

export default class JsonPath extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name:'query', defaultValue: "$.store.book[*].author", description: "JSON Path Expression" }),
  ]);

  async process(input, {query}){
    return jp.query(input, query).map(value=>(value));
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}

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
