// ==UserScript==
// @name        Gitlab bot avatars
// @namespace   Violentmonkey Scripts
// @match       *://gitlab*/*
// @grant       none
// @version     1.0
// @author      Omid Kashan
// @description 19/09/2023, 12:42:20
// ==/UserScript==

const style = document.createElement('style')

style.textContent = `
a[href*="_bot_"] .gl-avatar-identicon-bg1 {
    background:#9C27B0;
}

a[href*="_bot_"] .gl-avatar-identicon-bg1:before {
    content:"BOT";
    font-size:10px;
    font-weight:bold;
}
`

document.head.appendChild(style)
