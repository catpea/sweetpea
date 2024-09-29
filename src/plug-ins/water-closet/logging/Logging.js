export default Inheritance => class Logging extends Inheritance {

  success(message){
    this.log(message, 'Success', 'success', 'yin-yang');
  }

  danger(message){
    this.log(message, 'Danger', 'danger', 'lightning');
  }

  warning(message){
    this.log(message, 'Warning', 'warning', 'umbrella');
  }

  info(message){
    this.log(message, 'Info', 'info', 'paperclip');
  }


  log(message, title, context='info', icon){
    const alert = this.alert(message,title,context,icon);
    document.body.appendChild(alert);
    return this;
  };

  alert(message='', title='', type='primary', icon='info-circle', accent='warning'){ //exclamation-triangle

    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`, 'mb-3');

    const heading = document.createElement('h4');
    heading.classList.add('alert-heading', `text-${accent}`);
    heading.append(title)

    const graphic = document.createElement('i');
    graphic.classList.add('bi', `bi-${icon}`, 'fs-3', `text-${accent}`, 'pe-2');

    if(title) alert.append(heading);
    alert.append(graphic, message);

    return alert;

  }

}
