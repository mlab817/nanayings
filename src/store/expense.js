import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb } from 'boot/firebase'
import { handleSuccess, handleError } from 'src/utils'

const state = () => {
	return {
		expenses: {}
	}
}

const actions = {
	add: ({ dispatch }, payload) => {
		const id = uid()

		const expense = {
			id: id,
			data: payload
		}

		dispatch('fbAdd', expense)
	},
	fbAdd: ({}, payload) => {
		const doc = firebaseDb.collection('expenses').doc()

		doc.set(payload.data)
			.then(handleSuccess)
			.catch(handleError)
	},
	fbRead: ({ commit }) => {
		const docs = firebaseDb.collection('expenses')

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
		Vue.set(state.expenses, payload.id, payload.data)
	},
	UPDATE: (state, payload) => {
		Vue.set(state.expenses, payload.id, payload.data)
	},
	DELETE: (state, id) => {
		Vue.delete(state.expenses, id)
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
