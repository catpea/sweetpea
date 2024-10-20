export default Inheritance => class Animation extends Inheritance {

  frontElement;
  backElement;
  isFlipped = false;

  currentRotation = 0;
  targetRotation = 0;
  animationFrame = null;

  flipTo(selector, options){

    const container = this.searchShadow('.perspective').pop();
    let frontElement = container.querySelector('.active-card');
    if(!frontElement) throw new Error('.active-card not found.')
    const backElement = container.querySelector(selector);
    if(!backElement) throw new Error('Card face not found.')

    const defaults = {
      increment: 10,
      currentRotation:0,
      targetRotation: 180,
      frontElement,
      backElement,
    };
    const setup = Object.assign(defaults, options);
    this.animateFlip2(setup);

    return this;
  }




  // Animate the card flip
  skipTo(selector) {
    this.flipTo(selector, {increment: 180});
      return this;
  }


  animateFlip2(conf) {
    conf.currentRotation += conf.increment;

    const frontRotation = conf.currentRotation;
    conf.frontElement.style.transform = `rotateX(${frontRotation}deg)`;
    if(frontRotation == 0 || frontRotation == 360) conf.frontElement.style.transform = 'none'; // Optimization to remove blur

    const backRotation  = 180 + conf.currentRotation;
    conf.backElement.style.transform = `rotateX(${backRotation}deg)`;
    if(backRotation == 0 || backRotation == 360) conf.backElement.style.transform = 'none'; // Optimization to remove blur


    // Check if the rotation is complete
    const isComplete = conf.currentRotation >= 180;
    if (!isComplete) {
      // continue animation
      conf.animationFrame = requestAnimationFrame(() => this.animateFlip2(conf));
    } else {
      // When done, cancel the animation frame and reset the state
      conf.isFlipped = true;
      cancelAnimationFrame(conf.animationFrame);
      conf.animationFrame = null;
      conf.frontElement.classList.remove('active-card');
      conf.backElement.classList.add('active-card');
    }


  }


}
