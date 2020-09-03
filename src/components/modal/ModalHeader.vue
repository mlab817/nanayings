<template>
	<q-card-section class="row">
		<div class="text-h6">{{title}}</div>
		<q-space />
		<q-btn
			v-if="closeBtn"
			icon="close"
			v-close-popup
			dense
			flat
			round></q-btn>
	</q-card-section>
</template>

<script>
	export default {
		name: 'ModalHeader',
		props: {
			title: {
				type: String,
				required: true
			},
			closeBtn: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
