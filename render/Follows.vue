<template>
	<div>
		<div id='header'>
			<Icon id='back' @click.native=back name='angle-left'></Icon>
			<div id='title'>{{$router.currentRoute.name.slice(0,1).toUpperCase() + $router.currentRoute.name.slice(1)}}</div>
		</div>
		<div id='posts-cover' @scroll='onscroll()'>
			<div id='follows'>
				<Blog v-for='(blog, key) in blogs' :key=key :blog_name=blog.name @click.native=render_bloginfo(blog.name) ></Blog>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import { ipcRenderer } from 'electron'
import Vue from 'vue'
import Blog from './SideBar/Blog.vue'
import BlogInfo from './Contents/BlogInfo.vue'

export default {
	props: ['blog'],
	components: { Icon, Blog },
	data: function () { return { blogs: [] } },
	created: function () {
		console.log(this.$router.currentRoute.name)
		ipcRenderer.removeAllListeners(this.$router.currentRoute.name)
		ipcRenderer.on(this.$router.currentRoute.name, (evt, msg) => {
			console.log(msg)
			this.blogs = this.blogs.concat(msg.blogs)
		})
		ipcRenderer.send(this.$router.currentRoute.name, { blog_identifier: this.blog, offset: this.blog.lengs > 0 ? this.blogs.length + 1 : 0 })
	},
	methods: {
		back: function () {
			this.$router.back()
		},
		onscroll: function () {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function (obj) {
				var cover = document.getElementById('posts-cover')
				if (cover.scrollTop + cover.clientHeight > document.getElementById('follows').lastChild.previousElementSibling.offsetTop) {
					ipcRenderer.send(obj.$router.currentRoute.name, { blog_identifier: obj.blog, offset: obj.blogs.length + 1 })
				}
			}, 200, this)
		},
		render_bloginfo: function (blog_name) {
			const contents = new Vue({
				components: { BlogInfo },
				router: this.$router,
				data: { blog_name: blog_name },
				template: '<BlogInfo :blog_name=blog_name />'
			})
			contents.$mount('#contents')
		}
	}
}
</script>

<style scoped lang="scss">
@import './base.scss';
#posts-cover {
	@include content;
	.link {
		@include link_in_content;
	}
}
#header {
	@include header;
	#title {
		padding: 0;
		margin: 0;
		line-height: $headerHeight;
		height: $headerHeight;
	}
	#back {
		@include back;
	}
}
</style>
