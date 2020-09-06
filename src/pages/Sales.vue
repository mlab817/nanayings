<template>
  <q-page>
    <page-title icon="monetization_on" title="Sales"></page-title>

    <q-list bordered separator>
    	<q-item v-for="(sale, key) in sales" :key="key">
    		<q-item-section avatar>
    			<q-avatar class="bg-primary text-white">
    				{{sale.customer.label.charAt(0)}}
    			</q-avatar>
    		</q-item-section>
    		<q-item-section>
    			<q-item-label>{{sale.customer.label}}</q-item-label>
    			<q-item-label>{{sale.quantity}} x {{sale.product.label}}</q-item-label>
    		</q-item-section>
    		<q-item-section side>
    			<q-item-label>P {{sale.amount.toLocaleString()}}</q-item-label>
    		</q-item-section>
    	</q-item>
    </q-list>

    <div class="row q-pa-sm justify-between text-h6">
    	<div>Total Sales:</div>
    	<div>{{
    		arraySales.reduce((sum, sale) => {
    			sum += sale.amount
    			return sum
    		}, 0) | formatMoney
    	}}</div>
    </div>
  </q-page>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
	components: {
		PageTitle
	},
  name: 'PageSales',
  computed: {
  	sales() {
  		return this.$store.state.sale.sales
  	},
  	arraySales() {
  		const sales = this.sales

  		return Object.keys(sales).map(key => {
  			return {
  				...sales[key],
  				id: key
  			}
  		})
  	}
  },
  filters: {
  	formatMoney(val) {
  		if (val) {
  			return 'P ' + val.toLocaleString()
  		}
  		return 0
  	}
  },
  created() {
  	this.$store.dispatch('sale/fbRead')
  }
}
</script>
