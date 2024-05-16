// ==UserScript==
// @name        Gitlab approve button
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://gitlab.com/**/environments/*?tab=deployment-history
// @grant       none
// @version     1.0
// @author      Omid Kashan
// @description Makes the pipeline approve button more obvious
// ==/UserScript==

const style = document.createElement('style')

style.textContent = `
button[title="Approval options"],
button[data-original-title="Approval options"] {
  background-color:var(--green-400) !important;
  color:white;
  border:none !important;
  box-shadow:none !important;
}

button[title="Approval options"] svg,
button[data-original-title="Approval options"] svg {
  fill:white;
}

button[title="Approval options"]:hover,
button[data-original-title="Approval options"]:hover {
  background-color:var(--green-200) !important;
}

button[title="Approval options"]:after,
button[data-original-title="Approval options"]:after {
    content:"Approve";
    margin-left:8px;
    color:white;
}
`

document.head.appendChild(style)
