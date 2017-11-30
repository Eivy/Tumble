<template>
	<div>
		<div class='audio' >
			<div v-html=post.player></div>
			<div class='audio-info'>
				<img v-if="post.hasOwnProperty('album_art')" :src=post.album_art ></img>
				<table class='data'>
					<tr class="datum artist" v-if='post.hasOwnProperty("artist")'><td class='key'>Artist</td><td class='value'>{{post.artist}}</td></tr>
					<tr class="datum album" v-if='post.hasOwnProperty("album")'><td class='key'>Album</td><td class='value'>{{post.album}}</td></tr>
					<tr class="datum track_num" v-if='post.hasOwnProperty("track_number")'><td class='key'>Track No.</td><td class='value'>{{post.track_number}}</td></tr>
					<tr class="datum track_name" v-if='post.hasOwnProperty("track_name")'><td class='key'>Track Name</td><td class='value'>{{post.track_name}}</td></tr>
					<tr class="datum year" v-if='post.hasOwnProperty("year")'><td class='key'>Year</td><td class='value'>{{post.year}}</td></tr>
					<tr class="datum plays" v-if='post.hasOwnProperty("plays")'><td class='key'></td><td class='value'>{{post.plays}} times played</td></tr>
				</table>
			</div>
		</div>
		<div>
			<PostCaption v-if='post.caption.length > 0' v-bind:post=post />
			<PostInfo v-bind:post=post />
			<PostTag v-if='post.tags.length > 0' v-bind:post=post />
		</div>
	</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
.audio-info {
	overflow: hidden;
	background-color: #fff;
	img {
		float: left;
		width: 25%;
		border: 2px solid $backgroundColor;
		border-radius: 2px;
		padding: 0;
		margin: 0;
	}
	.data {
		display: table-cell;
		vertical-align: middle;
		width: 70%;
		.datum {
			width: 100%;
			padding: $contentPadding;
			.key {
				color: gray;
				display: table-cell;
				text-align: right;
				vertical-align: middle;
				white-space: nowrap;
			}
			.value {
				display: table-cell;
			}
		}
	}
}
</style>
