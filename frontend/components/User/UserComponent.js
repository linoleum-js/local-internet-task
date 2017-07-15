
import AbstractComponent from '../AbstractComponent';
import './user.css';

export default class UserComponent extends AbstractComponent {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.template = require('./user-template.html');
    this.events = {
      'click .submit-button': this.handleSubmit
    };
  }

  handleSubmit(event) {
    const target = event.target;
    const form = target.form;
    const data = this.collectFormData(form);
    if (data.valid) {
      event.preventDefault();
      return;
    }
  }
}