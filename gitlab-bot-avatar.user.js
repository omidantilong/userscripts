// ==UserScript==
// @name        Gitlab bot avatars
// @namespace   https://github.com/omidantilong/userscripts
// @match       *://gitlab*/*
// @grant       none
// @version     1.1
// @author      Omid Kashan
// @description Changes the default Gitlab avatar to something more useful for bot accounts
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
