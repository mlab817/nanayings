import { firebaseDb } from 'boot/firebase'
import Vue from 'vue'
import { handleError, handleSuccess } from 'src/utils'

const state = () => {
	return {
		shops: {}
	}
}

const actions = {
	fbRead: ({ commit }) => {
		const docs = firebaseDb.collection('shops')

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
		const doc = firebaseDb.collection('shops').doc()

		doc.set(payload)
			.then(handleSuccess)
			.catch(handleError)
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.shops, payload.id, payload.data)
	},
	UPDATE: (state, payload) => {
		Vue.set(state.shops, payload.id, payload.data)
	},
	DELETE: (state, id) => {
		Vue.delete(state.shops, id)
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
