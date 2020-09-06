import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'
import { handleSuccess, handleError } from 'src/utils'

const state = () => {
	return {
		sales: {}
	}
}

const actions = {
	add: ({ dispatch }, payload) => {
		dispatch('fbAdd', payload)
	},
	fbAdd: ({}, payload) => {
		const doc = firebaseDb.collection('sales')

		doc.set(payload)
			.then(handleSuccess)
			.catch(handleError)
	},
	fbRead: ({ commit }) => {
		const docs = firebaseDb.collection('sales')

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
		Vue.set(state.sales, payload.id, payload.data)
	},
	UPDATE: (state, payload) => {
		Vue.set(state.sales, payload.id, payload.data)
	},
	DELETE: (state, id) => {
		Vue.delete(state.sales, id)
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
