<template>
  <q-page>
  	<page-title title="Manage Expenses">
  		<q-btn icon-right="add" label="Add" color="primary" @click="addExpenseDialog = true"></q-btn>
  	</page-title>

  	<template v-if="Object.keys(groupedExpenses).length">
  		<q-list bordered separator>
  			<template v-for="(items, key) in groupedExpenses">
  				<div :key="key">
	  				<q-item-label header>{{ key }}</q-item-label>
	  				<q-item v-for="item in items" :key="item.id">
		  				<q-item-section avatar>
			  				<q-avatar color="primary" text-color="white">{{item.particular.charAt(0)}}</q-avatar>
			  			</q-item-section>
			  			<q-item-section>
			  				<q-item-label>{{item.particular}}</q-item-label>
			  				<q-item-label caption>{{item.quantity}} {{item.unit}} x {{item.unitPrice}}</q-item-label>
			  			</q-item-section>
			  			<q-item-section side>
			  				{{item.amount.toLocaleString()}}
			  			</q-item-section>
		  			</q-item>
		  		</div>
  			</template>
  			<q-item>
  				<q-item-section>
	  				<q-item-label>Total Expenses</q-item-label>
	  			</q-item-section>
	  			<q-item-section side class="text-black">
	  				{{totalAmount.toLocaleString()}}
	  			</q-item-section>
  			</q-item>
  		</q-list>
  	</template>
  	<template v-else>
  		<q-banner inline-actions class="bg-red-1 q-ma-md">
  			No expense added yet.
  			<template v-slot:action>
  				<q-btn flat label="Add" color="negative" @click="addExpenseDialog = true"></q-btn>
  			</template>
  		</q-banner>
  	</template>

  	<q-dialog v-model="addExpenseDialog">
  		<q-card style="max-width: 80wh; width: 400px;">
  			<q-card-section>
  				<div class="text-h6">Add Expense</div>
  			</q-card-section>
  			<q-card-section>
	  			<q-form ref="addExpenseForm" @submit.prevent="addExpense" class="q-gutter-y-sm" greedy >
	  				<span class="text-caption text-negative">* All fields are required.</span>
	  				<q-input v-model="expense.date" label="Date" stack-label type="date" :rules="required" hide-bottom-space />
	  				<q-input v-model="expense.particular" label="Particular" stack-label :rules="required" hide-bottom-space />
	  				<q-input v-model="expense.quantity" label="Quantity" stack-label type="number" :rules="required" hide-bottom-space />
	  				<q-input v-model="expense.unit" label="Unit of Measure" stack-label hint="Ex. kg, g, pc, box, pack" :rules="required" hide-bottom-space />
	  				<q-input v-model="expense.unitPrice" label="Unit Price" stack-label type="number" :rules="required" hide-bottom-space />
	  				<q-input v-model="amount" label="Total Amount" stack-label readonly />
	  				<q-checkbox v-model="addToInventory" label="Add to Inventory" />
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

export default {
	components: {
		'page-title': () => import('../components/PageTitle.vue')
	},
  name: 'PageExpenses',
  computed: {
  	expenses() {
  		return this.$store.state.expense.expenses
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
  	}
  },
  data() {
  	return {
  		addExpenseDialog: false,
  		expense: {
  			date: '',
  			particular: '',
  			quantity: 0,
  			unit: '',
  			unitPrice: 0,
  			amount: 0
  		},
  		addToInventory: true,
  		required: [val => !!val || '* Required']
  	}
  },
  methods: {
	  addExpense() {
	  	// add amount computed from unitPrice * quantity
	  	this.expense.amount = this.amount

	  	this.$refs.addExpenseForm.validate().then(success => {
	  		if (success) {
	  			console.log('success')
	  			this.$store.dispatch('expense/add', this.expense)
	  				.then(() => {
	  					// reset form
	  					this.expense = {
				  			date: '',
				  			particular: '',
				  			quantity: 0,
				  			unit: '',
				  			unitPrice: 0,
				  			amount: 0
				  		}
				  		// hide dialog
	  					this.addExpenseDialog = false
	  				})
	  				.catch(err => console.log(err.message))
	  		} else {
	  			console.error('error')
	  		}
	  	})
	  }
	}
}
</script>
