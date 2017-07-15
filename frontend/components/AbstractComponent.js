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

  render(container, data = {}) {
    this.container = container;
    container.innerHTML = this.template;
    this.update(data);
    this.bindEvents();
    this.componentRendered();
  }

  bindEvents() {
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
      this.container.addEventListener(eventName, callbackWrapper, true);
      this._addedEvents.push({ eventName, callbackWrapper });
    }
  }

  update(data) {
    for (let name in data) {
      const value = data[name];
      const nodes = this.container.querySelectorAll(`[data-bind="${name}"]`);
      Array.prototype.forEach.call(nodes, (node) => {
        if (node.nodeName === 'INPUT') {
          node.value = value;
        } else {
          node.innerHTML = value;
        }
      })
    }
  }

  collectFormData(form) {
    const inputs = form.querySelectorAll('[data-bind]');
    const result = { fields: {}, valid: true };
    Array.prototype.forEach.call(inputs, (input) => {
      const name = input.getAttribute('data-bind');
      const value = input.value;
      result.fields[name] = value;
      result.valid = result.valid && input.validity.valid;
    });

    return result;
  }

  componentRendered() {}
}