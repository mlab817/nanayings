import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import customer from './customer'
import expense from './expense'
import inventory from './inventory'
import item from './item'
import order from './order'
import product from './product'
import sale from './sale'
import shop from './shop'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      customer,
      expense,
      inventory,
	    item,
      order,
      product,
      sale,
	    shop
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
