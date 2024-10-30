// ==UserScript==
// @name        Get Contentful Non-2FA accounts
// @namespace   https://github.com/omidantilong/userscripts
// @match       *://app.contentful.com/account/organizations/*/organization_memberships
// @grant       none
// @version     3.0
// @author      Omid Kashan
// @description Retrieves list of users without 2FA enabled
// ==/UserScript==

const PAGE_LIMIT = 100


async function getUsers({endpoint, headers, skip = 0} = {}) {

  const usersApiEndpoint = `${endpoint}?activePage=0&include=sys.user&limit=${PAGE_LIMIT}&order=-sys.createdAt&query=&skip=${skip}`

  const response = await fetch(usersApiEndpoint, {
    method: "GET",
    headers
  }).then((res) => res.json())

  console.log(response)


  return response

}

async function fetchUserList({endpoint, headers}) {

  let skip = 0

  const { container, copyButton } = await createContainer()
  const { total, includes } = await getUsers({endpoint, headers, skip})

  let list = includes.User
  let fetched = includes.User.length

  do {

    skip += PAGE_LIMIT

    const { includes } = await getUsers({endpoint, headers, skip})

    list.push(...includes.User)
    fetched += includes.User.length

  } while(fetched < total)

  const affectedUsers = list.filter((user) => !user["2faEnabled"]).sort((a,b) => a.email < b.email ? -1 : 1)

  console.log(affectedUsers)

  copyButton.removeAttribute("disabled")
  container.textContent = ""

  affectedUsers.forEach((user) => {
    container.insertAdjacentHTML("beforeend", `<li>${user.email}</li>\n`)
  })

}

function createRequest(arguments) {

  const endpoint = arguments[0].split("?")[0]
  const headers = arguments[1].headers
  fetchUserList({endpoint, headers})

}

function beginOverride() {

  let collected = false
  const fetch = window.fetch

  window.fetch = function() {
    if(!collected && arguments[0].includes("organization_memberships")) {
      collected = true
      createRequest(arguments)
    }
    return Promise.resolve(fetch.apply(window, arguments))
  }


}

async function createContainer() {
  const main = await waitForElement("table[data-test-id='organization-membership-list']")
  const parent = document.createElement("div")
  const container = document.createElement("ul")
  const copyButton = document.createElement("button")

  const wrapper = document.querySelector("div[data-test-id='cf-layout-content-container']")

  parent.classList.add("userlist-container")
  parent.insertAdjacentHTML("afterbegin", `<h2>⚠️ Non-2FA accounts</h2>`)
  parent.append(container)
  parent.append(copyButton)
  wrapper.prepend(parent)

  copyButton.textContent = "Copy to clipboard"
  copyButton.setAttribute("disabled", "")

  copyButton.addEventListener("click", (e) => {
    navigator.clipboard.writeText(container.textContent)
  })

  container.insertAdjacentHTML("afterbegin", `<li class="userlist-loading">Loading...</li>`)

  return { container, copyButton }

}

function addStyles() {

  const style = document.createElement("style")

  style.textContent = `
  body:has(.userlist-container) {
    overflow-y: auto !important
  }

  div:has(> section[data-test-id='cf-ui-layout']) {
    display:block !important;
  }

  .userlist-container {
    padding:1.5rem;
    background:white;
    position:relative;
    z-index:999;
    box-shadow:0px 2px 10px rgba(0,0,0,0.1);
    margin:2rem auto 2rem auto;
    border-radius:4px;
    border:2px solid #FF7043;
    max-width:900px;
    width:100%;
  }

  .userlist-container h2 {
    margin:0 0 1rem 0;
  }

  .userlist-container button {
    background:#FF7043;
    padding:.75rem 1rem;
    color:white;
    font-weight:bold;
    border-radius:4px;
    margin:1rem 0 0 0;
  }

  .userlist-container button[disabled] {
    display:none
  }

  .userlist-loading {
    color:#666;
  }
  `

  document.head.appendChild(style)

}

async function waitForElement(selector) {

  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect()
        resolve(document.querySelector(selector))
      }
    })
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    })
  })

}

function init() {

  addStyles()
  beginOverride()

}

init()
