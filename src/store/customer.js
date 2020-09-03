import Vue from 'vue'
import { uid } from 'quasar'

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
	add: ({ commit }, payload) => {
		const customer = {
			id: uid(),
			data: payload
		}
		commit('ADD', customer)
	},
	delete: ({ commit }, id) => {
		commit('DELETE', id)
	}
}

const mutations = {
	ADD: (state, payload) => {
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
