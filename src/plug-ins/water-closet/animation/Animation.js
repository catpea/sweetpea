export default Inheritance => class Animation extends Inheritance {

  frontElement;
  backElement;

  isFlipped = false;

  // currentRotation = 0;
  // flipInterval = null;

  currentRotation = 0;
  targetRotation = 0;
  animationFrame = null;

  flipCard(frontElement, backElement){
    this.frontElement = frontElement;
    this.backElement = backElement;
    this.startFlip();
  }

  startFlip() {
    this.targetRotation = this.isFlipped ? 0 : 180;
    this.animateFlip();
  }

  // startFlip() {
  //    const targetRotation = this.isFlipped ? 0 : 180;
  //    this.flipInterval = setInterval(() => {
  //      this.currentRotation += this.isFlipped ? -5 : 5;
  //
  //      // Apply rotation to both front and back faces
  //      this.frontElement.style.transform = `rotateY(${this.currentRotation}deg)`;
  //      this.backElement.style.transform = `rotateY(${this.currentRotation + 180}deg)`;
  //
  //      // Check if the flip is complete
  //      if (this.isFlipped ? this.currentRotation <= 0 : this.currentRotation >= 180) {
  //        clearInterval(this.flipInterval);
  //        this.flipInterval = null;
  //        this.isFlipped = !this.isFlipped;
  //      }
  //    }, 16); // 16ms interval for smoother animation (~60fps)
  //  }


  // Animate the card flip
  animateFlip() {
    // Gradually increase or decrease the rotation
    if (this.isFlipped) {
      this.currentRotation -= 5;
    } else {
      this.currentRotation += 5;
    }

    // Apply the current rotation to both front and back faces
    // this.frontElement.style.transform = `rotateY(${this.currentRotation}deg)`;
    // this.backElement.style.transform = `rotateY(${this.currentRotation + 180}deg)`;
    const frontRotation = this.currentRotation;
    const backRotation = this.currentRotation + 180;

    if(frontRotation == 0 || frontRotation == 360){
      this.frontElement.style.transform = `rotateY(${frontRotation}deg)`;
      this.frontElement.style.transform = 'none';
    }else{
      this.frontElement.style.transform = `rotateY(${frontRotation}deg)`;
    }

    if(backRotation == 0 || backRotation == 360){
      this.backElement.style.transform = `rotateY(${backRotation}deg)`;
      this.backElement.style.transform = 'none';
    }else{
      this.backElement.style.transform = `rotateY(${backRotation}deg)`;
    }

    // Check if the rotation is complete
    if (this.isFlipped ? this.currentRotation > 0 : this.currentRotation < 180) {
      this.animationFrame = requestAnimationFrame(() => this.animateFlip());
    } else {
      // When done, cancel the animation frame and reset the state
      this.isFlipped = !this.isFlipped;
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

}
