import Vue from 'vue'
import { uid } from 'quasar'

const state = () => {
	return {
		products: {
			ID1: {
				name: 'Banana Bread with Chocolate',
				description: 'Banana bread with generous chocolate flavor',
				price: 140
			},
			ID2: {
				name: 'Plain Banana Bread',
				description: 'The original banana bread',
				price: 130
			}
		}
	}
}

const actions = {
	add: ({ commit }, payload) => {
		const id = uid()

		const product = {
			id: id,
			data: payload
		}

		commit('ADD', product)
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.products, payload.id, payload.data)
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
