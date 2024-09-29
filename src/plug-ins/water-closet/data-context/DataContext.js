export default Inheritance => class DataContext extends Inheritance {
  context = {};

  removeSubscription(){
    this.subscriptions.map(x=>x.subscription())
    return this;
  }
  
}
