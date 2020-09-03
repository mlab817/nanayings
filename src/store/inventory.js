import Vue from 'vue'
import { uid } from 'quasar'

const state = () => {
	return {
		inventories: {},
		items: {
			'ce51404b-7ae1-43a3-99ca-576fb0a0cf32': { name: 'Chocolate' },
			'464e7f48-1137-4fdc-acb6-ccbf60c0c29a': { name: 'Egg' },
			'c1ceb16c-d7cd-4a12-8fce-e1c2cb33a45a': { name: 'Marshmallow' },
			'745df4fb-2cab-42dc-b931-2a4cd05ece86': { name: 'Banana' },
			'86eea59d-2f7d-4506-b6a8-1de72ddb9aff': { name: 'Flour' },
			'd62273e0-f251-46a9-af6a-bcda6671be86': { name: 'Butter' }
		}
	}
}

const actions = {
	addItem: ({ commit }, payload) => {
		const item = {
			id: uid(),
			data: {
				name: payload
			}
		}

		commit('ADD_ITEM', item)
	}
}

const mutations = {
	ADD_ITEM: (state, payload) => {
		Vue.set(state.items, payload.id, payload.data)
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
