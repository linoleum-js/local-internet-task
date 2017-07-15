
import AbstractComponent from '../AbstractComponent';
import Api from '../../util/Api';

export default class LiveComponent extends AbstractComponent {
  constructor() {
    super();
    this.template = require('./live-template.html');
  }

  componentRendered() {
    Api.request('GET', '/api/user').then((data) => {
      this.container.children[0].classList.remove('loading');
      this.update(data);
    });
  }
}