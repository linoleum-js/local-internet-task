import HomeComponent from './components/Home/HomeComponent';
import UserComponent from './components/User/UserComponent';

export default {
  '/': () => {
    return new HomeComponent();
  },
  '/user': () => {
    return new UserComponent();
  },
  '/live': () => {

  },
  '404': () => {

  }
};