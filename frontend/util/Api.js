

export default class Api {
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
        reject(message);
      });
      xhr.send('data=' + JSON.stringify(data));
    });
  }
}