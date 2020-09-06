import Vue from 'vue'
import { uid } from 'quasar'

const state = () => {
	return {
		orders: {
			ID1: {
				customer: {
					value: '1cf406d8-213e-4399-bcaa-8e69cb760bcc',
					label: 'Lester Bolotaolo'
				},
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
			},
			ID2: {
				customer: {
					value: '1cf406d8-213e-4399-bcaa-8e69cb760bcc',
					label: 'Lester'
				},
				address: 'Molave Condominium',
				contactNo: '09562688184',
				deliveryDate: '2020-09-06',
				deliveryTime: '12:00',
				orders: [
					{
						product: {
							value: 'ID1',
							label: 'Banana Bread with Chocolate (P140)'
						},
						quantity: '1',
						price: 140,
						value: 0,
						amount: 140
					}
				],
				orderPlaced: '2020-09-06T02:09:33.286Z'
			},
			'081b91f7-efc5-430f-96bf-02013b276ec2': {
				customer: {
					value: '1cf406d8-213e-4399-bcaa-8e69cb760bcc',
					label: 'Lester'
				},
				address: 'Molave Condominium',
				contactNo: '09562688184',
				quantity: 0,
				deliveryDate: '2020-09-05',
				deliveryTime: '21:00',
				price: 130,
				amount: 0,
				orders: [
					{
						product: {
							value: 'ID1',
							label: 'Banana Bread with Chocolate (P140)'
						},
						quantity: '1',
						price: 140,
						value: 0,
						amount: 140
					},
					{
						product: {
							value: 'ID2',
							label: 'Plain Banana Bread (P130)'
						},
						quantity: '1',
						price: 130,
						value: 0,
						amount: 130
					}
				],
				orderPlaced: '2020-09-05T13:35:06.781Z'
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
	},
	delete: ({ commit, state }, payload) => {
		// payload contains id and reason
		const order = {
			id: payload.id,
			data: {
				...state.orders[payload.id],
				deleted: true,
				reason: payload.reason
			}
		}

		commit('DELETE', order)
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.orders, payload.id, payload.data)
	},
	DELETE: (state, payload) => {
		Vue.set(state.orders, payload.id, payload.data)
	}
}

const getters = {
	active: (state) => {
		const orders = state.orders, activeOrders = {}

		Object.keys(orders).forEach(key => {
			const deleted = orders[key].deleted || false
			if (!deleted) {
				activeOrders[key] = orders[key]
			}
		})

		return activeOrders
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
