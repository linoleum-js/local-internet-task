
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
      this.update(data.fields);
      return;
    }
  }

  componentRendered() {
    setTimeout(() => {
      this.container.children[0].classList.remove('loading');
      this.update({
        firstName: 'some name',
        lastName: 'some last name',
        middleName: 'middle name',
        balance: 24,
        age: 22
      })
    }, 100);
  }
}