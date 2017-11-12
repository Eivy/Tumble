<template>
	<div class='info'>
		<div class='separator'>Info</div>
		<div>{{post.blog_name}}</div>
		<div>reblogged: {{post.reblogged_from_name}}</div>
		<div>original: {{post.reblogged_root_name}}</div>
		<div>{{new Date(post.timestamp*1000).toLocaleString()}}</div>
		<div>{{post.note_count}} notes</div>
	</div>
</template>

<script>
export default {
	props: ['post']
}
</script>
