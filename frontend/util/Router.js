

export default class Router {
  constructor(routes, root) {
    this.routes = routes;
    this.root = root;
    this.handleLinkClick = this.handleLinkClick.bind(this);
    document.addEventListener('click', this.handleLinkClick, true);
  }

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

  goToRoute(href) {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    let component = this.routes[href];
    if (!component) {
      component = this.routes[404];
    }
    this.currentComponent = component;
    this.currentComponent.render(this.root);
  }
}