<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-avatar>
          <q-img src="favicon.ico" />
        </q-avatar>

        <q-toolbar-title>
          Nanayings Yummy Treats
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8 text-uppercase"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard'
  },
  {
    title: 'Manage Orders',
    icon: 'shopping_cart',
    link: '/orders'
  },
  {
    title: 'Manage Customers',
    icon: 'account_circle',
    link: '/customers'
  },
  {
    title: 'Manage Expenses',
    icon: 'payment',
    link: '/expenses'
  },
  {
    title: 'Manage Inventory',
    icon: 'store',
    link: '/inventory'
  },
  {
    title: 'Manage Products',
    icon: 'category',
    link: '/products'
  },
  {
    title: 'Sales Report',
    icon: 'monetization_on',
    link: '/sales'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
	created() {
  	this.$store.dispatch('customer/fbRead')
		this.$store.dispatch('shop/fbRead')
		this.$store.dispatch('order/fbRead')
		this.$store.dispatch('product/fbRead')
		this.$store.dispatch('sale/fbRead')
		this.$store.dispatch('expense/fbRead')
		this.$store.dispatch('item/fbRead')
	}
}
</script>
