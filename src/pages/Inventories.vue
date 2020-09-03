<template>
  <q-page>
    <page-title title="Manage Inventory"></page-title>
  </q-page>
</template>

<script>
export default {
	components: {
		'page-title': () => import('../components/PageTitle.vue')
	},
  name: 'PageInventories'
}
</script>
