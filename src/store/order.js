import Vue from 'vue'
import { uid } from 'quasar'

const state = () => {
	return {
		orders: {
			ID1: {
				name: 'Lester',
				address: 'Molave Condominium',
				contactNo: '09562688184',
				quantity: 3,
				deliveryDate: '2020-09-04',
				deliveryTime: '12:00',
				product: {
					value: 'ID1',
					label: 'Banana Bread with Chocolate (P140)'
				},
				price: 140,
				amount: 420,
				orderPlaced: '2020-08-31T07:15:55.632Z'
			}
		}
	}
}

const actions = {
	add: ({ commit }, payload) => {
		const id = uid()
		payload.orderPlaced = new Date()

		const order = {
			id: id,
			data: payload
		}

		commit('ADD', order)
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.orders, payload.id, payload.data)
	}
}

const getters = {}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
