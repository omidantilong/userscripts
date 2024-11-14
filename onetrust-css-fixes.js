// ==UserScript==
// @name        OneTrust CSS Fixes
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://*.my.onetrust.com/cookies/categorizations/*
// @grant       none
// @version     1.0
// @author      -
// @description Fix some of OneTrust's awful styling
// ==/UserScript==

const style = document.createElement('style')

style.textContent = `
div.domain-level-category > div > h1 + div + div {
width:100%;
}

div.domain-level-category > div .ot-collapse__content {
padding:0 !important
}

`

document.head.appendChild(style)