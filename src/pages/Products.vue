<template>
  <q-page>
    <page-title icon="category" title="Manage Products">
  		<q-btn icon-right="add" label="Add" color="primary" @click="addProductDialog = true"></q-btn>
  	</page-title>

  	<template v-if="Object.keys(products).length">
  		<q-list bordered separator>
	  		<q-item v-for="(item, key) in products" :key="key">
	  			<q-item-section avatar>
	  				<q-avatar>
              <q-img :src="item.imageURL" />
            </q-avatar>
	  			</q-item-section>
	  			<q-item-section>
	  				<q-item-label>{{item.name}}</q-item-label>
	  				<q-item-label caption>{{item.description}}</q-item-label>
	  			</q-item-section>
	  			<q-item-section side>
	  				P {{item.price.toLocaleString()}}
	  			</q-item-section>
	  		</q-item>
  		</q-list>
  	</template>
  	<template v-else>
  		<q-banner inline-actions class="bg-red-1 q-ma-md">
  			No product added yet.
  			<template v-slot:action>
  				<q-btn flat label="Add" color="negative" @click="addProductDialog = true"></q-btn>
  			</template>
  		</q-banner>
  	</template>

  	<q-dialog v-model="addProductDialog">
  		<q-card style="width: 400px; max-width: 80wh;">
  			<q-card-section>
  				<div class="text-h6">Add Product</div>
  			</q-card-section>
  			<q-card-section>
  				<q-form ref="addProductForm" @submit="addProduct" class="q-gutter-sm" greedy>
  					<q-input v-model="product.name" label="Name" stack-label :rules="required" hide-bottom-space />
  					<q-input v-model="product.description" label="Description" stack-label :rules="required" hide-bottom-space />
  					<q-input v-model="product.imageURL" label="Image URL" stack-label :rules="required" hide-bottom-space />
  					<q-input v-model="product.price" label="Price (PhP)" stack-label :rules="required" hide-bottom-space />
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
import PageTitle from '../components/PageTitle.vue'

export default {
  components: {
    PageTitle
  },
  name: 'PageProducts',
  computed: {
  	products() {
  		return this.$store.state.product.products
  	}
  },
  data() {
  	return {
  		addProductDialog: false,
  		required: [val => !!val || '* Required'],
  		product: {
  			name: '',
  			description: '',
  			price: 0
  		}
  	}
  },
  methods: {
  	addProduct() {
  		this.$refs.addProductForm.validate().then(success => {
  			if (success) {
  				this.$store.dispatch('product/add', this.product)
  					.then(() => {
  						this.product = {
  							name: '',
				  			description: '',
				  			price: 0
  						}
  						this.addProductDialog = false
  					})
  					.catch(err => console.log(err.message))
  			} else {
  				console.log('error')
  			}
  		})
  	}
  },
  created() {
    this.$store.dispatch('product/fbRead')
  }
}
</script>
