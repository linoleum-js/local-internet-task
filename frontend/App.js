
import Router from './util/Router';
import routes from './routes';

export default class App {
  constructor() {
  }

  start() {
    this.router = new Router(routes);
  }
}