// ==UserScript==
// @name        Get Contentful Non-2FA accounts
// @namespace   https://github.com/omidantilong/userscripts
// @match       *://app.contentful.com/account/organizations*
// @grant       none
// @version     1.1
// @author      Omid Kashan
// @description Retrieves list of users without 2FA enabled
// ==/UserScript==

let FIRST_RUN = true

function initPolling() {
  const waitForRows = setInterval(() => {
    const rows = document.querySelectorAll('table tbody tr')

    if(rows && rows.length) {

      const firstCell = document.querySelector('table tbody tr td:nth-child(2)')

      if(firstCell.textContent.includes('@')) {

        if(FIRST_RUN) {
          createElements()
          FIRST_RUN = false
        }

        clearInterval(waitForRows)
        getRows(rows)

      }
    }
  }, 500)

}

function getRows(rows) {

  setTimeout(() => {

    const filtered = Array.from(rows).map((row) => {
      const statusCell = row.querySelector('td:nth-child(5)')
      const emailCell = row.querySelector('td:nth-child(2)')
      return statusCell.textContent.includes('Enabled') ? false : emailCell.querySelector('div[data-test-id="user-card.email"]').textContent
    }).filter((d) => d)

    console.log(filtered.join('\n'))

    printResults(filtered)

  }, 100)

}

function printResults(users) {

  const list = document.querySelector(`.userlist-2fa-container ul`)

  list.textContent = ''

  users.forEach((user) => {
    list.insertAdjacentHTML('beforeend', `<li>${user}</li>`)
  })

}

function createElements() {

  const main = document.querySelector('main')
  const container = document.createElement('div')
  const list = document.createElement('ul')

  container.classList.add('userlist-2fa-container')
  container.insertAdjacentHTML('afterbegin', '<h2>Non-2FA accounts found on this page</h2>')
  container.append(list)
  main.prepend(container)

}

function addStyles() {

  const style = document.createElement('style')

  style.textContent = `
  div.userlist-2fa-container {
    padding:1.5rem;
    background:white;
    position:relative;
    z-index:999;
    box-shadow:0px 2px 10px rgba(0,0,0,0.1);
    margin:0 auto 2rem auto;
    border-radius:4px;
    border:1px solid #ddd;
    max-width:1280px;
  }

  div.userlist-2fa-container h2 {
    margin:0 0 1rem 0;
  }

  button[data-test-id*="cf-ui-pagination"] span {
    pointer-events:none;
  }
  `

  document.head.appendChild(style)

}

function addListeners() {

  window.addEventListener('click', (e) => {
    if(e.target?.dataset?.testId?.includes('cf-ui-pagination')) {
      initPolling()
    }
  })
  
  window.addEventListener('change', (e) => {
    if(e.target?.dataset?.testId?.includes('cf-ui-select')) {
      initPolling()
    }
  })

}

function init() {
  addStyles()
  addListeners()
  initPolling()
}

init()
