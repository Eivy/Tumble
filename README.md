# Tumble [![latest build status](https://travis-ci.org/Eivy/Tumble.svg?branch=master)](https://travis-ci.org/Eivy/Tumble) [![Build status](https://ci.appveyor.com/api/projects/status/50dd7sa8q3s82ae2?svg=true)](https://ci.appveyor.com/project/Eivy/tumble)

Tumblr client for Desktop(Windows, macOS, Linux)

## Shortcuts

| key |   |
|:---:|---|
| Ctrl + r (Cmd + r on macOS) | Reload dashboard |
| j,Down,Left | Next post |
| k,Up,Right | Previous post |
| r | Reblog |
| l | Like post |
| s | Save image or video |
| Space | Scroll contents (not left side posts view) |
| Shift + Space | Scroll above contents (not left side posts view) |
| Ctrl + Shift + d (Cmd + Shift + d on macOS) | Show dashboard |
| Ctrl + Shift + l (Cmd + Shift + l on macOS) | Show Likes |
| Ctrl + Shift + s (Cmd + Shift + s on macOS) | Show search |
| Ctrl + Shift + u (Cmd + Shift + u on macOS) | Show your information |

## TODO

- [ ] Error Handling
- [ ] Show result of actions (reblog, like and save)
- [ ] Bookmark blogs
- [x] Lint
- [ ] Create Post
- [ ] Multi Post
- [ ] Customize shortcuts


## Develop

You need **YOUR OWN** consumer key and secret.

To use consumer key and secret, run `npm run consumer`.
This creates `consumer.js` for use consumer key and secret in Tumble.
