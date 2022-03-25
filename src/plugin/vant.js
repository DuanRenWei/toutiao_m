import Vue from 'vue'
import {
  Button,
  NavBar,
  Form,
  Field,
  Toast,
  CountDown,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Lazyload,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Dialog
} from 'vant'

Vue
  .use(Button)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(CountDown)
  .use(Tabbar)
  .use(TabbarItem)
  .use(VanImage)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
