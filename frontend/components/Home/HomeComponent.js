import AbstractComponent from '../AbstractComponent';

export default class HomeComponent extends AbstractComponent {
  constructor() {
    super();
    this.template = require('./home-template.html');
    this.events = {
      'click': this.handleClick
    };
  }

  handleClick() {
    console.log('click');
  }
}