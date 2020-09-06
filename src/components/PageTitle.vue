<template>
	<q-toolbar class="text-primary">
		<q-avatar v-if="icon">
			<q-icon :name="icon"></q-icon>
		</q-avatar>
		<q-toolbar-title>{{title}}</q-toolbar-title>
		<q-space />
		<slot></slot>
	</q-toolbar>
</template>

<script>
	export default {
		name: 'PageTitle',
		props: {
			title: {
				type: String,
				required: true
			},
			icon: {
				type: String,
				default: null
			}
		}
	}
</script>
