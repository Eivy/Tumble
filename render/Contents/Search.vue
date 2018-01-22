<template>
	<div id='contents'>
		<div id='top'>
			<Icon name='search'></Icon>
			<input ref=text type='search' @search=search($event.target.value) ></input>
		</div>
		<div id='log'>
			<LinkItem v-for='(l, i) in log' :key=i :text=l @click.native=search(l)></LinkItem>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Store from 'electron-store'
import LinkItem from '../LinkItem.vue'
const store = new Store()
export default {
	components: { Icon, LinkItem },
	data: function () { return { 'log': store.get('cache.search', []) } },
	mounted: function () {
		this.$refs.text.focus()
	},
	methods: {
		search: function (value) {
			if (value.length > 0) {
				this.$router.push('/tag/' + value)
				event.target.blur()
				this.log.unshift(value)
				this.log = this.log.filter((item, i, array) => array.indexOf(item) === i)
				store.set('cache.search', this.log)
			}
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
#top {
	@include header;
	input {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		padding-left: $headerHeight / 2;
		background-clip: padding-box;
		border-radius: 5px;
		border: 5px solid $backgroundColor;
		box-sizing: border-box;
		font-size: 100%;
	}
	svg {
		position: absolute;
		left: 0;
		width: $headerHeight / 4;
		height: 100%;
		padding-left: $headerHeight / 4;
		color: #000;
		z-index: 99;
	}
}
#log {
	@include content;
}
</style>
