<template>
	<q-toolbar>
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
			}
		}
	}
</script>
