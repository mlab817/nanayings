<template>
  <q-page>
    <page-title title="Manage Orders">
      <q-btn icon-right="add" label="Add" color="primary" @click="addOrderDialog = true"></q-btn>
    </page-title>

    <template v-if="Object.keys(orders).length">
  	  <q-list>
        <q-item v-for="(order, key) in orders" :key="key">
          {{key}}
          {{order}}
        </q-item>
      </q-list>
    </template>

    <q-banner inline-actions v-else class="q-ma-sm bg-red-1">
      Hooray! No pending orders.
      <template v-slot:action>
        <q-btn flat color="negative" label="Add" @click="addOrderDialog = true" />
      </template>
    </q-banner>

  	<q-dialog v-model="addOrderDialog">
      <q-card style="width: 400px; max-width: 80wh;">
        <q-card-section>
          <div class="text-h6">Add Order</div>
        </q-card-section>
        <q-card-section>
          {{order}}
          <q-form ref="addOrderForm" @submit="addOrder" class="q-gutter-sm" greedy>
            <q-input v-model="order.name" label="Name" stack-label :rules="required" hide-bottom-space />
            <q-input v-model="order.address" label="Address" stack-label :rules="required" hide-bottom-space />
            <q-input v-model="order.contactNo" label="Contact Numbers" stack-label :rules="required" hide-bottom-space />
            <q-select v-model="order.product" :options="optionProducts" label="Product" stack-label :rules="required" hide-bottom-space @input="setPrice" />
            <q-input v-model="order.price" label="Price (PhP)" stack-label :rules="required" hide-bottom-space type="number" />
            <q-input v-model="order.quantity" label="Quantity" stack-label :rules="required" hide-bottom-space type="number" />
            <q-input v-model="order.amount" label="Amount (PhP)" stack-label :rules="required" hide-bottom-space type="number" readonly />
            <q-input v-model="order.deliveryDate" label="Delivery Date" stack-label :rules="required" hide-bottom-space type="date" />
            <q-input v-model="order.deliveryTime" label="Delivery Time" stack-label :rules="required" hide-bottom-space type="time" />
            <q-input v-model="order.remarks" label="Remarks" stack-label hide-bottom-space autogrow />
            <div class="row justify-end">
              <q-btn label="Cancel" flat color="primary" v-close-popup />
              <q-btn class="q-ml-sm" type="submit" label="Submit" color="primary"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  components: {
    'page-title': () => import('../components/PageTitle.vue')
  },
  name: 'PageOrders',
  computed: {
    products() {
      const products = this.$store.state.product.products

      return products
    },
    optionProducts() {
      const products = this.products
      const optionProducts = []

      Object.keys(products).forEach(key => {
        const product = products[key]
        optionProducts.push({
          value: key,
          label: `${product.name} (P${product.price})`
        })
      })

      return optionProducts
    },
    orders() {
      return this.$store.state.order.orders
    }
  },
  watch: {
    'order.quantity': {
      deep: true,
      handler(newVal, oldVal) {
        this.order.amount = newVal * this.order.price
      }
    }
  },
  data() {
  	return {
  		addOrderDialog: false,
  		order: {
        name: '',
        address: '',
        contactNo: '',
        quantity: 0,
        deliveryDate: '',
        deliveryTime: '',
        price: 0,
        amount: 0
      },
      required: [val => !!val || '* Required']
  	}
  },
  methods: {
    addOrder() {
      this.$refs.addOrderForm.validate().then(success => {
        if (success) {
          const order = this.order
          this.$store.dispatch('order/add', order)
            .then(() => {
              this.order = {
                name: '',
                address: '',
                contactNo: '',
                quantity: 0,
                deliveryDate: '',
                deliveryTime: '',
                price: 0,
                amount: 0
              }
              this.addOrderDialog = false
            })
            .catch(err => console.log(err.message))
        } else {
          console.log('error')
        }
      })
    },
    setPrice(e) {
      console.log(e)
      const selectedProduct = this.products[e.value]
      this.order.price = parseInt(selectedProduct.price)
    }
  }
}
</script>
