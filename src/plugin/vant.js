import Vue from 'vue'
import {
  Button,
  NavBar,
  Form,
  Field,
  Toast,
  CountDown
} from 'vant'

Vue
  .use(Button)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(CountDown)

Vue.prototype.$toast = Toast
