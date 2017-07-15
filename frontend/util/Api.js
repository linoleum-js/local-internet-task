
var toastr = require('toastr/toastr');

export default class Api {
  /**
   * @param method
   * @param url
   * @param data
   * @returns {Promise}
   */
  static request(method, url, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      xhr.addEventListener('load', () => {
        resolve(JSON.parse(xhr.responseText));
      });
      xhr.addEventListener('error', (message) => {
        toastr.error(message);
        reject(message);
      });
      xhr.send('data=' + JSON.stringify(data));
    });
  }

  /**
   * @param url
   * @param callback
   * @returns {WebSocket}
   */
  static socketConnect(url, callback) {
    const socket = new WebSocket('ws://localhost:3000' + url);

    socket.addEventListener('open', () => {
      socket.send('poke');
    });

    socket.addEventListener('message', (event) => {
      callback(JSON.parse(event.data));
    });

    socket.addEventListener('error', (event) => {
      toastr.error(event.data);
    });

    return socket;
  }
}