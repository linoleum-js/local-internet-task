import './util/matches-polyfill';
import 'materialize-css/dist/css/materialize.css';


import Router from './util/Router';
import routes from './routes';

export default class App {
  constructor() {
    const container = document.getElementById('container');
    this.router = new Router(routes, container);
  }
}