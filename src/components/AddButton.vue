<template>
	<q-btn
		icon-right="add"
		label="Add"
		color="primary"
		@click="$emit('click')" />
</template>

<script>
export default {
	name: 'AddButton'
}
</script>
