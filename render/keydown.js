document.onkeydown = function() {
	switch(event.keyCode) {
		case 83: // s
			document.getElementById('download').click();
			break;
		case 74: // j
		case 39: // right
		case 40: // down
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				if (global.current === undefined) {
					global.current = document.getElementById('posts').firstChild;
				} else if (global.current.nextElementSibling !== null) {
					global.current = current.nextElementSibling;
				}
			}
			click();
			break;
		case 75: // k
		case 37: // left
		case 38: // up
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				if (global.current === undefined) {
					global.current = document.getElementById('posts').lastChild;
				} else if (global.current.previousElementSibling !== null) {
					global.current = current.previousElementSibling;
				}
			}
			click();
			break;
		case 82: // r
			if (!event.altKey && !event.ctrlKey && !event.metaKey) {
				document.getElementById('reblog').click();
			}
			break;
		case 76: // l
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				document.getElementById('like').click();
			}
			break;
		case 32: // space
			if (!event.altKey && !event.ctrlKey && !event.metaKey) {
				event.preventDefault();
				var cover = document.getElementById('contents');
				var content = document.getElementById('content');
				var value = (cover.clientHeight / 2) - content.style.paddingTop;
				if (event.shiftKey) {
					value = value * -1;
				}
				content.scrollTop += value;
			}
			break;
		case 27:
			global.current = undefined;
			break;
	}
};

function click() {
	global.current.firstChild.click();
	var rect = global.current.getClientRects()[0];
	if (global.current.getClientRects()[0].top < 0) {
		global.current.scrollIntoView();
	} else if (rect.bottom > document.getElementById('posts-cover').clientHeight) {
		global.current.scrollIntoView(false);
	}
}
