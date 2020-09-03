<template>
	<q-card-actions align="right">
		<q-btn
			label="Cancel"
			flat
			color="primary"
			v-close-popup />
		<q-btn
			class="q-ml-sm"
			label="Submit"
			color="primary"
			@click="$emit('submit')"></q-btn>
	</q-card-actions>
</template>

<script>
	export default {
		name: 'ModalActions'
	}
</script>
