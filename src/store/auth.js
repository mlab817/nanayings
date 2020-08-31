import { firebaseAuth } from 'boot/firebase'

const state = () => {
	return {
		loggedIn: false,
		user: null
	}
}

const actions = {
	login: ({ commit }, payload) => {
		const { email, password } = payload

		firebaseAuth
			.signInWithEmailAndPassword(email, password)
			.then(() => console.log('login'))
			.catch(err => console.log('err', err.message))
	},
	register: ({ commit }, payload) => {
		console.log(payload)
	}
}

const mutations = {}

const getters = {}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
