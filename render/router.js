import VueRouter from 'vue-router'
import Dashboard from './Dashboard.vue'
import Likes from './Likes.vue'
import Blog from './Blog.vue'
import Tag from './Tag.vue'
import UserInfo from './UserInfo.vue'
import Follows from './Follows.vue'

export default new VueRouter({
	routes: [
		{
			name: 'dashboard',
			path: '/dashboard',
			component: Dashboard
		},
		{
			name: 'likes',
			path: '/likes',
			component: Likes
		},
		{
			name: 'blog',
			path: '/blog/:blog',
			component: Blog,
			props: true
		},
		{
			name: 'tag',
			path: '/tag/:tag',
			component: Tag,
			props: true
		},
		{
			name: 'userinfo',
			path: '/userinfo',
			component: UserInfo,
			props: true
		},
		{
			name: 'followers',
			path: '/followers/:blog',
			component: Follows,
			props: true
		},
		{
			name: 'following',
			path: '/following/:blog',
			component: Follows,
			props: true
		}
	]
});
