import HomeComponent from './components/Home/HomeComponent';

export default {
  '/': () => {
    return new HomeComponent();
  },
  '/user': () => {

  },
  '/live': () => {

  },
  '404': () => {

  }
};