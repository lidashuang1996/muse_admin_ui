import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './styles/main.scss';
// @ts-ignore
import Ripplier from 'vue-rippler';

import 'muse-ui-message/dist/muse-ui-message.css';
// @ts-ignore
import Message from 'muse-ui-message';

import Toast from 'muse-ui-toast';

import theme from 'muse-ui/lib/theme';

import Helpers from 'muse-ui/lib/Helpers';

import VueTouchRipple from 'vue-touch-ripple';
import 'vue-touch-ripple/dist/vue-touch-ripple.css';

// mount with global
Vue.use(VueTouchRipple/*,  {
  // default global options
  color: '#fff',
  opacity: 0.3,
  speed: 1,
  transition: 'ease'
} */);

Vue.use(Helpers);

theme.add('teal', {
  primary: '#ff7a27',
  secondary: '#ff4081',
  success: '#ff4081',
  warning: '#ff4081'
}, 'light');

theme.use('teal');

Vue.use(Toast);

Vue.use(MuseUI);

Vue.use(Ripplier);

Vue.use(Message);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
