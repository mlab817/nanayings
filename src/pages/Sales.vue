<template>
  <q-page>
    <page-title icon="monetization_on" title="Sales">
    	<q-btn icon="add" label="Add" @click="addSaleDialog = true" color="primary"></q-btn>
    </page-title>

    <q-list bordered separator>
    	<q-item v-for="(sale, key) in sales" :key="key">
    		<q-item-section avatar>
    			<q-avatar class="bg-primary text-white">
    				{{sale.customer.label.charAt(0)}}
    			</q-avatar>
    		</q-item-section>
    		<q-item-section>
    			<q-item-label>{{sale.customer.label}}</q-item-label>
    		</q-item-section>
        <q-item-section>
          <template v-for="(order, index) in sale.orders">
            <q-item-label :key="index">{{order.quantity}} x {{order.product.label}}</q-item-label>
          </template>
        </q-item-section>
    		<q-item-section side>
    			<q-item-label>{{
            sale.orders.reduce((sum, order) => {
              sum += parseFloat(order.amount)
              return sum
            }, 0) | formatMoney
          }}</q-item-label>
    		</q-item-section>
    	</q-item>
    </q-list>

    <div class="row q-pa-sm justify-between text-h6">
    	<div>Total Sales:</div>
    	<div>{{ totalSales | formatMoney
    	}}</div>
    </div>

    <q-dialog v-model="addSaleDialog">
    	<q-card style="width: 400px; max-width: 80wh;">
       <modal-header title="Add Sale"></modal-header>
       <q-card-section>
         <q-form class="q-gutter-sm">
           <q-select v-model="sale.customer" label="Customer" stack-label :options="customers" />
           <q-list v-if="sale.orders.length">
             <q-item v-for="(order, index) in sale.orders" :key="index" class="q-pa-none">
               <q-item-section>
                 <q-item-label>{{order.quantity}} x {{order.product.label}}</q-item-label>
               </q-item-section>
               <q-item-section side>
                 P {{order.amount}}
               </q-item-section>
             </q-item>
           </q-list>
           <q-btn label="Add Order" color="primary" @click="addOrderDialog = true" />
         </q-form>
       </q-card-section>
       <modal-actions @submit="addSale"></modal-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addOrderDialog">
      <q-card style="width: 400px; max-width: 80wh;">
       <modal-header title="Add Sale"></modal-header>
       <q-card-section>
         <q-form class="q-gutter-sm">
           <q-select v-model="newOrder.product" label="Product" stack-label :options="products" @input="setPrice" />
           <q-input v-model.number="newOrder.quantity" label="Quantity" stack-label type="number" />
           <q-input v-model.number="newOrder.amount" label="Amount (PhP)" stack-label type="number" />
         </q-form>
       </q-card-section>
       <modal-actions @submit="addOrder"></modal-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import ModalHeader from '../components/modal/ModalHeader.vue'
import ModalActions from '../components/modal/ModalActions.vue'

export default {
	components: {
		PageTitle,
    ModalHeader,
    ModalActions
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
  	},
    totalSales() {
      const sales = this.arraySales

      return sales.reduce((sum, sale) => {
        sum += parseFloat(sale.orders.reduce((saleSum, order) => {
          saleSum += parseFloat(order.amount)
          return saleSum
        }, 0))
        return sum
      }, 0)
    },
    customers() {
      const customers = this.$store.state.customer.customers

      return Object.keys(customers).map(key => {
        return {
          value: key,
          label: customers[key].name
        }
      })
    },
    products() {
      const products = this.$store.state.product.products

      console.log(products)

      return Object.keys(products).map(key => {
        return {
          value: key,
          label: `${products[key].name} (P${products[key].price})`
        }
      })
    }
  },
  data() {
  	return {
  		addSaleDialog: false,
      addOrderDialog: false,
      sale: {
        customer: null,
        orders: []
      },
      newOrder: {
        product: null,
        quantity: null,
        price: null,
        amount: null
      }
  	}
  },
  watch: {
    'newOrder.product': {
      deep: true,
      handler(newVal) {
        this.newOrder.amount = parseFloat(this.newOrder.price) * parseFloat(this.newOrder.quantity)
      }
    },
    'newOrder.quantity': {
      deep: true,
      handler(newVal) {
        this.newOrder.amount = parseFloat(this.newOrder.price) * parseFloat(newVal)
      }
    }
  },
  methods: {
    setPrice(e) {
      console.log(e.value)
      const products = this.$store.state.product.products
      const selectedProduct = products[e.value]
      const { price } = selectedProduct
      this.newOrder.price = parseFloat(price)
    },
    addOrder() {
      this.sale.orders.push(this.newOrder)
      this.newOrder = {
        product: null,
        quantity: null,
        price: null,
        amount: null
      }
      this.addOrderDialog = false
    },
    addSale() {
      this.$store.dispatch('sale/add', this.sale)
        .then(() => {
          this.sale = {
            customer: null,
            orders: []
          }
          this.addSaleDialog = false
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
    this.$store.dispatch('product/fbRead')
  }
}
</script>
