<template>
  <q-page>
  	<page-title icon="payment" title="Manage Expenses">
  		<q-btn icon-right="add" label="Add" color="primary" @click="showAddItem"></q-btn>
  	</page-title>

    <template v-if="Object.keys(groupedExpenses).length">
      <q-table
        flat
        square
        bordered
        :data="arrayExpenses"
        :pagination="pagination"
        :columns="columns"
        wrap-cells
        hide-bottom />
      <div class="row q-pa-sm text-h6 justify-between">
        <div>Total Expenses:</div>
        <div class="text-primary">{{ totalExpenses | formatMoney }}</div>
      </div>
    </template>

  	<template v-else>
  		<q-banner inline-actions class="bg-red-1 q-ma-md">
  			No expense added yet.
  			<template v-slot:action>
  				<q-btn flat label="Add" color="negative" @click="addItemDialog = true"></q-btn>
  			</template>
  		</q-banner>
  	</template>

    <q-dialog v-model="addItemDialog">
      <q-card style="max-width: 80wh; width: 400px;">
        <q-card-section>
          <div class="text-h6">Add Item</div>
        </q-card-section>
        <q-card-section>
          <q-form ref="addExpenseForm" class="q-gutter-y-sm" @submit="onSubmit" @reset="onReset" greedy>
            <q-input v-model="newItem.date" label="Date Purchased" stack-label type="date" :rules="required" hide-bottom-space />
						<q-select v-model="newItem.shop" :options="optionShop" label="Store" stack-label :rules="required" hide-bottom-space>
							<template v-slot:after>
								<q-icon name="add" @click="addShop" class="cursor-pointer"></q-icon>
							</template>
						</q-select>
            <q-select v-model="newItem.item" :options="optionItems" label="Item" stack-label :rules="required" hide-bottom-space>
              <template v-slot:after>
                <q-icon name="add" @click="addItem" class="cursor-pointer" />
              </template>
            </q-select>
            <q-input v-model="newItem.particular" label="Particular" stack-label :rules="required" hide-bottom-space />
            <q-input v-model.number="newItem.quantity" label="Quantity" stack-label type="number" min="0" :rules="required" hide-bottom-space />
            <q-input v-model="newItem.unit" label="Unit of Measure" stack-label :rules="required" hide-bottom-space />
            <q-input v-model.number="newItem.price" label="Price" stack-label type="number" min="0" :rules="required" hide-bottom-space step="0.01" />
            <q-input v-model.number="newItem.amount" label="Amount" stack-label type="number" min="0" :rules="required" hide-bottom-space readonly />
            <q-checkbox v-model="newItem.inventory" label="Add to Inventory" :rules="required" hide-bottom-space />
            <div class="row justify-end">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn label="Submit" type="submit" color="primary" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import _ from 'lodash'
import { date } from 'quasar'

export default {
	components: {
		'page-title': () => import('../components/PageTitle.vue')
	},
  name: 'PageExpenses',
  computed: {
  	expenses() {
  		return this.$store.state.expense.expenses
  	},
    arrayExpenses() {
      return Object.keys(this.expenses).map(key => {
        return {
          ...this.expenses[key],
          id: key
        }
      })
    },
  	amount() {
  		return this.expense.quantity * this.expense.unitPrice
  	},
  	totalAmount() {
  		const expenses = this.expenses

  		const sum = Object.values(expenses).reduce((t, { amount }) => t + amount, 0)

  		return sum
  	},
  	groupedExpenses() {
  		const expenses = this.$store.state.expense.expenses
  		const arrayExpenses = []

  		Object.keys(expenses).forEach(key => {
  			arrayExpenses.push({
  				id: key,
  				...expenses[key]
  			})
  		})

  		const groupedExpenses = _.groupBy(arrayExpenses, 'date')

  		return groupedExpenses
  	},
    stores() {
      return this.$store.state.inventory.stores
    },
    optionItems() {
      const items = this.$store.state.item.items
      return Object.keys(items).map(key => {
        return {
        	label: items[key].name,
					value: key
        }
      })
    },
    optionShop() {
      const shops = this.$store.state.shop.shops
      return Object.keys(shops).map(key => {
        return {
          label: shops[key].name,
          value: key
        }
      })
    },
    totalExpenses() {
      const expenses = this.arrayExpenses

      return expenses.reduce((sum, ex) => {
        sum += ex.amount
        return sum
      }, 0)
    }
  },
  data() {
  	return {
      addItemDialog: false,
      newItem: {
        date: null,
        shop: null,
        item: null,
        particular: null,
        quantity: 0,
        price: 0,
        unit: null,
        amount: 0,
        inventory: false
      },
      pagination: {
        rowsPerPage: 0,
        sortBy: 'date',
        descending: true
      },
      columns: [
        {
          name: 'date',
          label: 'Date',
          field: row => date.formatDate(row.date, 'MMM DD, YYYY'),
          align: 'left',
          sortable: true
        },
        {
          name: 'shop',
          label: 'Shop',
          field: row => (typeof row.shop === 'object') ? row.shop.label : row.shop,
          align: 'center',
          sortable: true
        },
        {
          name: 'item',
          label: 'Item',
          field: 'item',
          align: 'center',
          sortable: true
        },
        {
          name: 'particular',
          label: 'Particular',
          field: 'particular',
          align: 'center',
          sortable: true
        },
        {
          name: 'quantity',
          label: 'Qty',
          field: row => `${row.quantity} ${row.unit}`,
          align: 'center',
          sortable: true
        },
        {
          name: 'price',
          label: 'Price',
          field: 'price',
          align: 'right',
          sortable: true
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          align: 'right',
          sortable: true
        }
      ],
  		required: [val => !!val || '* Required']
  	}
  },
  watch: {
    'newItem.quantity': {
      deep: true,
      handler(newVal, oldVal) {
        this.newItem.amount = parseFloat(this.newItem.price) * newVal
      }
    },
    'newItem.price': {
      deep: true,
      handler(newVal, oldVal) {
        this.newItem.amount = this.newItem.quantity * parseFloat(newVal)
      }
    }
  },
  methods: {
	  onSubmit() {
	  	this.$refs.addExpenseForm.validate().then(success => {
	  		if (success) {
	  			this.$store.dispatch('expense/add', this.newItem)
	  				.then(() => {
				  		// hide dialog
              this.newItem = {
                date: null,
                store: null,
                item: null,
                particular: null,
                quantity: 0,
                price: 0,
                unit: null,
                amount: 0,
                inventory: false
              }
	  					this.addItemDialog = false
	  				})
	  				.catch(err => console.log(err.message))
	  		} else {
	  			console.error('error')
	  		}
	  	})
	  },
    addItem() {
      this.$q.dialog({
        title: 'Add Option',
        message: 'Add item to options',
        prompt: {
          model: '',
          isValid: val => !!val
        },
        persistent: true,
        cancel: true
      }).onOk(data => this.$store.dispatch('item/add', {
      	name: data
      }))
    },
		addShop () {
			this.$q.dialog({
				title: 'Add Shop',
				message: 'Name of store',
				prompt: {
					model: '',
					isValid: val => !!val
				},
				cancel: true
			}).onOk(data => this.$store.dispatch('shop/add', {
				name: data
			}))
		},
    onReset() {
      this.newItem.date = ''
      this.newItem.shop = ''
      this.newItem.item = ''
      this.newItem.particular = ''
      this.newItem.quantity = 0
      this.newItem.price = 0
      this.newItem.unit = ''
      this.newItem.inventory = false
    },
    showAddItem() {
      // this.$refs.addExpenseForm.reset()
      this.addItemDialog = true
    }
	},
  filters: {
    formatMoney(val) {
      if (val) {
        return 'P ' + val.toFixed(2)
      }
      return 'P 0'
    }
  },
  created() {
    this.$store.dispatch('expense/fbRead')
  }
}
</script>
