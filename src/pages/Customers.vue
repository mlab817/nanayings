<template>
	<q-page>
		<page-title icon="account_circle" title="Manage Customers">
			<add-button @click="addCustomerDialog = true"></add-button>
		</page-title>

		<template v-if="Object.keys(customers).length">
			<q-list separator bordered>
				<q-item v-for="(customer, key) in customers" :key="key">
					<q-item-section avatar>
						<q-avatar class="bg-primary text-white">
							{{customer.name.charAt(0)}}
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label>{{customer.name}}</q-item-label>
						<q-item-label caption>{{customer.contactNo}}</q-item-label>
					</q-item-section>
					<q-item-section>
						<p v-for="(address, index) in customer.addresses" :key="index">{{address}}</p>
					</q-item-section>
					<q-item-section side>
						<q-btn flat round icon="more_vert">
							<q-menu>
								<q-item clickable @click="editCustomer(customer, key)" v-close-popup>
									<q-item-section avatar>
										<q-icon name="edit" />
									</q-item-section>
									<q-item-section>
										Edit
									</q-item-section>
								</q-item>
								<q-item clickable @click="deleteCustomer(key)" v-close-popup>
									<q-item-section avatar>
										<q-icon name="delete" />
									</q-item-section>
									<q-item-section>
										Delete
									</q-item-section>
								</q-item>
							</q-menu>
						</q-btn>
					</q-item-section>
				</q-item>
			</q-list>
		</template>

		<template v-else>
			<q-banner inline-actions class="q-ma-sm bg-red-1">
				No customer yet.
				<template v-slot:action>
					<q-btn flat label="Add" @click="addCustomerDialog = true" />
				</template>
			</q-banner>
		</template>

		<q-dialog v-model="addCustomerDialog">
			<q-card style="width: 400px; max-width: 80wh;">
				<q-card-section>
					<div class="text-h6">Add Customer</div>
				</q-card-section>
				<q-card-section>
					<q-form form="addForm">
						<q-input v-model="customer.name" label="Name" stack-label :rules="required" hide-bottom-space></q-input>
						<q-input v-model="customer.contactNo" label="Contact no(s)." stack-label :rules="required" hint="Separate with comma" hide-bottom-space></q-input>
						<template v-for="(add, index) in customer.addresses">
							<q-input :key="index" :value="add" :label="`Address ${index+1}`" @input="e => updateAddress(e, index)">
								<template v-slot:append>
									<q-icon name="delete" class="cursor-pointer" @click="deleteAddress(index)" />
								</template>
							</q-input>
						</template>
						<q-input v-model="newAddress" label="Address" stack-label @keyup.enter="addAddress">
							<template v-slot:append>
								<q-icon name="add" />
							</template>
						</q-input>
					</q-form>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat color="primary" label="Cancel" v-close-popup></q-btn>
					<q-btn color="primary" label="Submit" @click="addCustomer"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-list></q-list>
	</q-page>
</template>

<script>
	export default {
		components: {
			'page-title': () => import('../components/PageTitle.vue'),
			'add-button': () => import('../components/AddButton.vue')
		},
		name: 'PageCustomers',
		computed: {
			customers() {
				return this.$store.state.customer.customers
			}
		},
		data() {
			return {
				addCustomerDialog: false,
				customer: {
					name: '',
					contactNo: '',
					addresses: []
				},
				newAddress: '',
				required: [val => !!val || '* Required'],
				edit: false
			}
		},
		methods: {
			addAddress() {
				if (this.newAddress) {
					this.customer.addresses.push(this.newAddress)
					this.newAddress = null
				}
			},
			updateAddress(e, index) {
				this.customer.addresses.splice(index, 1, e)
			},
			deleteAddress(index) {
				this.customer.addresses.splice(index, 1)
			},
			addCustomer() {
				const { name, contactNo, addresses } = this.customer

				if (!name || !contactNo || !addresses.length) {
					alert('Please check inputs')
				} else {
					this.$store.dispatch('customer/add', this.customer)
						.then(() => {
							this.addCustomerDialog = false
							this.customer = {
								name: '',
								contactNo: '',
								addresses: []
							}
						})
				}
			},
			editCustomer(customer, index) {
				console.log(customer, index)
			},
			deleteCustomer(index) {
				this.$q.dialog({
					title: 'Delete Customer',
					message: 'Are you sure you want to delete this customer?',
					persistent: true,
					cancel: true
				})
				.onOk(() => this.$store.dispatch('customer/delete', index))
			}
		},
		created() {
			this.$store.dispatch('customer/fbRead')
		}
	}
</script>
