import HomeComponent from './components/Home/HomeComponent';
import UserComponent from './components/User/UserComponent';
import LiveComponent from './components/Live/LiveComponent';

export default {
  '/': () => {
    return new HomeComponent();
  },
  '/user': () => {
    return new UserComponent();
  },
  '/live': () => {
    return new LiveComponent();
  },
  '404': () => {
    return new HomeComponent();
  }
};