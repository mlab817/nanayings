import { firebaseDb } from 'boot/firebase'
import Vue from 'vue'
import { handleError, handleSuccess } from 'src/utils'

const state = () => {
	return {
		items: {}
	}
}

const actions = {
	fbRead: ({ commit }) => {
		const docs = firebaseDb.collection('items')

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
					commit('ADD', payload)
				}

				if (change.type === 'removed') {
					const id = change.doc.id

					commit('DELETE', id)
				}
			})
		})
	},
	add: ({ dispatch }, payload) => {
		dispatch('fbAdd', payload)
	},
	fbAdd: ({}, payload) => {
		const doc = firebaseDb.collection('items').doc()

		doc.set(payload)
			.then(handleSuccess)
			.catch(handleError)
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.items, payload.id, payload.data)
	},
	UPDATE: (state, payload) => {
		Vue.set(state.items, payload.id, payload.data)
	},
	DELETE: (state, id) => {
		Vue.delete(state.items, id)
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
