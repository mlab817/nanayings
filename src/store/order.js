import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'
import { handleSuccess, handleError } from 'src/utils'

const state = () => {
	return {
		orders: {}
	}
}

const actions = {
	add: ({ dispatch }, payload) => {
		payload.orderPlaced = new Date()

		dispatch('fbAdd', payload)
	},
	fbAdd: ({}, payload) => {
		const doc = firebaseDb.collection('orders').doc()

		doc.set(payload)
			.then(handleSuccess)
			.catch(handleError)
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
	},
	update: ({ dispatch }, payload) => {
		// data, id
	},
	fbUpdate: ({}, payload) => {
		const doc = firebaseDb.collection('orders').doc(payload.id)

		doc.update(payload.updates)
			.then(handleSuccess)
			.catch(handleError)
	},
	complete: ({ dispatch }, payload) => {
		// id, order
		const order = {
			id: payload.id,
			data: payload.order,
			updates: {
				completed: true
			}
		}
		dispatch('fbUpdate', order)
		dispatch('sale/add', payload.order, { root: true })
	},
	fbRead: ({ commit }) => {
		const docs = firebaseDb.collection('orders')

		docs.onSnapshot(querySnapshot => {
			querySnapshot.docChanges().forEach(change => {
				if (change.type === 'added') {
					const payload = {
						id: change.doc.id,
						data: change.doc.data()
					}
					commit('ADD', payload)
				}
				if (change.type === 'modified') {
					const payload = {
						id: change.doc.id,
						data: change.doc.data()
					}
					commit('UPDATE', payload)
				}
				if (change.type === 'removed') {
					const id = change.doc.id
					commit('DELETE', id)
				}
			})
		})
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.orders, payload.id, payload.data)
	},
	UPDATE: (state, payload) => {
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
			const completed = orders[key].completed || false
			console.log(completed)
			if (!deleted && !completed) {
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
