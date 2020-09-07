import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'
import { handleSuccess, handleError } from 'src/utils'

const state = () => {
	return {
		customers: {
			'1cf406d8-213e-4399-bcaa-8e69cb760bcc': {
				name: 'Lester',
				contactNo: '09562688184',
				addresses: ['Molave Condominium']
			},
			'a70960b0-854c-4ce7-b134-67c8fd1869ad': {
				name: 'Justine',
				contactNo: '09560631084',
				addresses: ['Molave Condominium']
			}
		}
	}
}

const actions = {
	add: ({ dispatch }, payload) => {
		dispatch('fbAdd', payload)
	},
	fbAdd: ({}, payload) => {
		const doc = firebaseDb.collection('customers').doc()

		doc.set(payload)
			.then(handleSuccess)
			.catch(handleError)
	},
	delete: ({ commit }, id) => {
		commit('DELETE', id)
	},
	fbRead: ({ commit }) => {
		const docs = firebaseDb.collection('customers')

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
		Vue.set(state.customers, payload.id, payload.data)
	},
	UPDATE: (state, payload) => {
		Vue.set(state.customers, payload.id, payload.data)
	},
	DELETE: (state, id) => {
		Vue.delete(state.customers, id)
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
