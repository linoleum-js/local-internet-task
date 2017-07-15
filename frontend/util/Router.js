/**
 * Class that handles url change and creates corresponding component
 * (destroying previous one)
 */
export default class Router {
  constructor(routes, container) {
    this.routes = routes;
    this.container = container;
    this.handleLinkClick = this.handleLinkClick.bind(this);
    document.addEventListener('click', this.handleLinkClick, true);
    // go to current route, before any actions
    const href = location.pathname;
    this.goToRoute(href || '/');
  }

  /**
   * On link click, prevent default action and perform route change
   * manually with instantiating corresponding component
   *
   * @param event
   */
  handleLinkClick(event) {
    const target = event.target;
    const pushUrl = (href) => {
      history.pushState({}, '', href);
      window.dispatchEvent(new Event('popstate'));
    };
    if (event.target.nodeName === 'A') {
      event.preventDefault();
      pushUrl(target.getAttribute('href'));
      this.goToRoute(target.getAttribute('href'));
    }
  }

  /**
   * Destroy previous component and create a new one
   *
   * @param href
   */
  goToRoute(href) {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    let component = this.routes[href]();
    if (!component) {
      component = this.routes[404]();
    }
    this.currentComponent = component;
    this.currentComponent.render(this.container);
  }
}