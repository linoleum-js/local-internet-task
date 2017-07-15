import './util/matches-polyfill';


import Router from './util/Router';
import routes from './routes';

export default class App {
  constructor() {
  }

  start() {
    const container = document.getElementById('container');
    this.router = new Router(routes, container);
  }
}