import Vue from 'vue'
import { uid } from 'quasar'

const state = () => {
	return {
		expenses: {
			'48ed4787-d006-4997-8684-54bc0c6a3491': {
				date: '2020-08-31',
				particular: 'Chocolate',
				quantity: 1,
				unit: 'kg',
				unitPrice: 100,
				amount: 100
			},
			'8ce2dcaa-92fe-486a-9d42-f9d411f2c958': {
				date: '2020-08-30',
				particular: 'Eggs',
				quantity: 10,
				unit: 'pc',
				unitPrice: 8,
				amount: 80
			},
			'b192e8bd-ed85-4535-9070-81ef37e8e03b': {
				date: '2020-08-30',
				particular: 'Eggs',
				quantity: 10,
				unit: 'pc',
				unitPrice: 10,
				amount: 100
			},
			'971f1ea7-8c14-4858-8acb-2fc9ca48e981': {
		 		date: '2020-08-31',
		 		particular: 'Banana',
		 		quantity: 2,
		 		unit: 'kg',
		 		unitPrice: 50,
		 		amount: 100
			},
			'f10dce60-a749-407b-804f-d4ab87406eee': {
				date: '2020-08-31',
				particular: 'Marshmallow',
				quantity: 1,
				unit: 'pack',
				unitPrice: 75,
				amount: 75
			}
		}
	}
}

const actions = {
	add: ({ commit }, payload) => {
		const id = uid()

		const expense = {
			id: id,
			data: payload
		}

		commit('ADD', expense)
	}
}

const mutations = {
	ADD: (state, payload) => {
		Vue.set(state.expenses, payload.id, payload.data)
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
