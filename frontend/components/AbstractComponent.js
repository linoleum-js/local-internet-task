/**
 * @abstract
 */
export default class AbstractComponent {
  constructor() {
    this.template = '';
    this.events = {};
    this._addedEvents = [];
  }

  destroy() {
    this._addedEvents.forEach((item) => {
      this.container.removeEventListener(item.eventName, item.callbackWrapper);
    });
    this.container.innerHTML = '';
    this._addedEvents = [];
  }

  render(container) {
    this.container = container;
    container.innerHTML = this.template;
    for (let key in this.events) {
      const parts = key.split(' ', 2);
      const eventName = parts[0];
      const selector = parts[1];
      const callback = this.events[key];
      const callbackWrapper = (event) => {
        const target = event.target;
        if (!selector || target.matches(selector)) {
          callback(event);
        }
      };
      container.addEventListener(eventName, callbackWrapper, true);
      this._addedEvents.push({ eventName, callbackWrapper });
    }
  }
}