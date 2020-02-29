// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import Suggestions from 'v-suggestions'
import Multiselect from 'vue-multiselect'
import 'v-suggestions/dist/v-suggestions.css' // you can import the stylesheets also (optional)
import VueSweetalert2 from 'vue-sweetalert2';
import VeeValidate, { Validator } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR';
import VueI18n from 'vue-i18n';


// Axios
axios.defaults.baseURL = 'https://api.partiudoarsangue.com.br/api/'
// axios.defaults.baseURL = 'http://localhost:8003/api/'
Vue.use(VueAxios, axios);

// Vee-validator
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'pt_BR'
});

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    pt_BR
  }
});

// Moment
Vue.use(VueMoment, {
	moment
});

Vue.component('suggestions', Suggestions)
Vue.component('multiselect', Multiselect)
Vue.use(VueSweetalert2);


 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
