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
        <modal-header title="Add Order" />
        <q-card-section>
          <q-form ref="addOrderForm" class="q-gutter-sm" greedy>
            {{order}}
            <q-select v-model="order.customer" :options="optionCustomers" stack-label label="Customer" hide-bottom-space @input="setAddresses"></q-select>
            <q-select v-model="order.address" :options="addresses" label="Address" stack-label :rules="required" hide-bottom-space />
            <q-input v-model="order.contactNo" label="Contact Numbers" stack-label :rules="required" hide-bottom-space />
            <!-- <q-select v-model="order.product" :options="optionProducts" label="Product" stack-label :rules="required" hide-bottom-space @input="setPrice" />
            <q-input v-model="order.price" label="Price (PhP)" stack-label :rules="required" hide-bottom-space type="number" />
            <q-input v-model="order.quantity" label="Quantity" stack-label :rules="required" hide-bottom-space type="number" />
            <q-input v-model="order.amount" label="Amount (PhP)" stack-label :rules="required" hide-bottom-space type="number" readonly /> -->
            <q-btn @click="addNewOrderDialog = true" label="Add Order" color="primary" />
            <q-input v-model="order.deliveryDate" label="Delivery Date" stack-label :rules="required" hide-bottom-space type="date" />
            <q-input v-model="order.deliveryTime" label="Delivery Time" stack-label :rules="required" hide-bottom-space type="time" />
            <q-input v-model="order.remarks" label="Remarks" stack-label hide-bottom-space autogrow />
          </q-form>
        </q-card-section>
        <modal-actions @submit="addOrder"></modal-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addNewOrderDialog">
      <q-card style="width: 400px; max-width: 80wh;">
        <modal-header title="Add New Order"></modal-header>
        <q-card-section>
          <q-select v-model="newOrder.product" :options="optionProducts" label="Product" stack-label @input="setPrice" />
          <q-select v-model="newOrder.price" label="Price" stack-label />
          <q-input v-model="newOrder.quantity" label="Quantity" stack-label type="number" min="0" />
          <q-input v-model="newOrder.amount" label="Amount" stack-label type="number" min="0" readonly />
        </q-card-section>
        <modal-actions @submit="addNewOrder"></modal-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import _ from 'lodash'

export default {
  components: {
    'page-title': () => import('../components/PageTitle.vue'),
    'modal-header': () => import('../components/modal/ModalHeader.vue'),
    'modal-actions': () => import('../components/modal/ModalActions.vue')
  },
  name: 'PageOrders',
  computed: {
    products() {
      const products = this.$store.state.product.products

      return products
    },
    customers() {
      return this.$store.state.customer.customers
    },
    optionCustomers() {
      const customers = this.customers
      const options = []

      Object.keys(customers).forEach(key => {
        options.push({
          value: key,
          label: customers[key].name
        })
      })

      return options
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
    },
    'newOrder.quantity': {
      deep: true,
      handler(newVal, oldVal) {
        this.newOrder.amount = newVal * this.newOrder.price
      }
    }
  },
  data() {
  	return {
  		addOrderDialog: false,
  		order: {
        customer: '',
        address: '',
        contactNo: '',
        quantity: 0,
        deliveryDate: '',
        deliveryTime: '',
        price: 0,
        amount: 0,
        orders: []
      },
      required: [val => !!val || '* Required'],
      addresses: [],
      addNewOrderDialog: false,
      newOrder: {
        product: '',
        quantity: 0,
        price: 0,
        value: 0
      }
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
      this.newOrder.price = parseInt(selectedProduct.price)
    },
    setAddresses(e) {
      const customers = this.customers
      const customerArray = []
      Object.keys(this.customers).forEach(key => {
        customerArray.push(customers[key])
      })
      const selectedCustomer = _.find(customerArray, { name: e.label })
      const { addresses, contactNo } = selectedCustomer
      this.addresses = addresses
      this.order.contactNo = contactNo
    },
    addNewOrder() {
      const orders = this.order.orders
      orders.push(this.newOrder)
      this.newOrder = {
        product: '',
        quantity: 0,
        price: 0,
        value: 0
      }
      this.addNewOrderDialog = false
    }
  }
}
</script>
