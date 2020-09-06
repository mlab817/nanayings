import { Notify } from 'quasar'

export const handleSuccess = () => {
	Notify.create({
		type: 'positive',
		message: 'Success'
	})
}

export const handleError = (err) => {
	Notify.create({
		type: 'negative',
		message: err.message
	})
}
