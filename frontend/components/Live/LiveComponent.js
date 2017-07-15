
import AbstractComponent from '../AbstractComponent';
import Api from '../../util/Api';

export default class LiveComponent extends AbstractComponent {
  constructor() {
    super();
    this.template = require('./live-template.html');
  }

  componentRendered() {
    this.connection = Api.socketConnect('/api/user', (data) => {
      this.container.children[0].classList.remove('loading');
      this.update(data);
    });
  }

  componentDestroyed() {
    this.connection.close();
  }
}