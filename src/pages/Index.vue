<template>
  <q-page>
  	<page-title icon="home" title="Home"></page-title>

    <div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <template v-for="index in 9">
          {{index}}
          <q-carousel-slide :name="index" :img-src="`${index}.jpg`" :key="index" />
        </template>
      </q-carousel>
    </div>

    <q-list separator>
    	<q-item-label header>Features</q-item-label>
    	<q-item v-for="(feature, index) in features" :key="index" clickable :to="feature.link">
       <q-item-section>
         <q-item-label>{{feature.title}}</q-item-label>
         <q-item-label caption>{{feature.description}}</q-item-label>
       </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

const featuresData = [
  {
    title: 'Manage Orders',
    description: 'Keep track of your orders',
    link: '/orders'
  },
  {
    title: 'Manage Customers',
    description: 'Record frequently ordering customers for faster creation of orders',
    link: '/customers'
  },
  {
    title: 'Manage Expenses',
    description: 'Keep track of business expenses. Add expenses into inventory as applicable.',
    link: '/expenses'
  },
  {
    title: 'Manage Inventory',
    description: 'Manage store inventory (e.g. ingredients, packaging, etc.). Add as purchased through expense management. Remove when used.',
    link: '/inventories'
  },
  {
    title: 'Manage Products',
    description: 'Manage store products including price list',
    link: '/products'
  },
  {
    title: 'Sales Report',
    description: 'When orders are complete, add it to sales. View your sales record.',
    link: '/sales'
  }
]

export default {
  components: {
    PageTitle
  },
  name: 'PageIndex',
  data() {
  	return {
  		features: featuresData,
      slide: 1,
      autoplay: true
  	}
  }
}
</script>
