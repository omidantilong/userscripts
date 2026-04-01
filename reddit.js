// ==UserScript==
// @name        Reddit tweaks
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://www.reddit.com/*
// @grant       none
// @version     1.0.1
// @author      Omid Kashan
// @description Various UI tweaks on reddit
// ==/UserScript==

const style = document.createElement("style");

style.textContent = `
span.ms-2xs.align-middle:has(svg[icon-name="search"]) {
  display:none
}
search-telemetry-tracker a {
  text-decoration:none!important;
  color:currentColor !important;
  border-bottom:1px dashed hsl(from currentColor h s l / 0.3) !important;

}
`;

document.head.appendChild(style);
