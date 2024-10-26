import {Worker} from 'actor';
import * as jp from './jsonpath.min.js';

export default class jsonPath extends Worker {

  static parameters = [
    { name:"query",   default:'$.store.book[*].author',    type:'string', description:'the authors of all books in the store' },
  ];

  async work(parameters){
    return jp.query(parameters.input, parameters.query);
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
