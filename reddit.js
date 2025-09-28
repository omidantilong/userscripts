// ==UserScript==
// @name        Reddit tweaks
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://www.reddit.com/*
// @grant       none
// @version     1.0
// @author      Omid Kashan
// @description Various UI tweaks on reddit
// ==/UserScript==

const style = document.createElement('style')

style.textContent = `
span:has(svg[icon-name="search-outline"]) {
  display:none
}
`

document.head.appendChild(style)