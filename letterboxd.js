// ==UserScript==
// @name        Letterboxd Enhancements
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://letterboxd.com/*
// @grant       none
// @version     1.0
// @author      Omid Kashan
// @description Various UI tweaks on letterboxd
// ==/UserScript==

const header = document.querySelector('.site-logo')

const formHtml = `
<div class="les-global-search">
  <div>
    <fieldset>
        <input type="text" class="field field-large ac_input" id="frm-film-search" data-url="/s/autocompletefilm" autocomplete="off" placeholder="Find a film...">
    </fieldset>
  </div>
</div>
`

const style = document.createElement('style')

style.textContent = `

.site-header section {
  width:calc(100% - 6rem);
  max-width:1600px;
  min-width:1200px;
  display:flex;
  align-items:center;

}

.site-header {
  background:linear-gradient(0deg, rgb(0 0 0 / 0), #000)
}
.site-header .main-nav {
  position:static;
}

.site-header .main-nav .navitem {
  position:relative;
  right:auto !important;
}

.site-header .react-component {
  margin-left:auto;
}

.site-header .site-logo {
  margin:0;
  width:66px;
  overflow:hidden;
}

.site-header .search-form,
.site-header #search {
  position:relative;
  top:auto;
  left:auto;
  right:auto;
}

.site-header .button-add {

}

.site-header .search-form {
  margin-left:1rem;
}

.backdrop-container {
  xtop:160px;
  width:100vw;
}

.backdrop-container #backdrop {
  width:100%;
  height:auto;
  aspect-ratio:16 / 9;
}

.backdrop-container .backdropmask::before {
  width:100%;
}

.site-body.-backdrop {
  padding-top:350px;
}

.content-wrap {
  width:1200px;
}

#film-page-wrapper > .col-17 {
  width:900px;
}

#film-page-wrapper > .col-17 > .col-10 {
  width:600px;
}

.ac_results {
  width:200px !important;
}

.les-global-search {
  height:auto;
  padding:.5rem 0;
  width:300px;
  position:relative;
  z-index:1;
}

.les-global-search input {
  width:100%;
  font-size:1.25rem;
  padding:.75rem;
  opacity:0.75;
  margin:0 0 0 1rem;
  background:white;
}

.les-global-search input:hover,
.les-global-search input:focus {
  opacity:1;
  box-shadow:0px 0px 10px rgb(0 0 0 / 0.5);
}

@media (min-width: 1200px) {
  .les-global-search {

  }
}

div#content {
}

.review.body-text p {
font-size:1.5rem;
}

p a.text-slug {
font-size:1.125rem;
}

p.text-link.text-footer {
font-size:1.125rem;
}

`

document.head.appendChild(style)

header.insertAdjacentHTML('afterEnd', formHtml)

//document.querySelector("#find-film").remove()
//document.querySelector('.js-header-signin-form').remove()
//document.querySelector('p:has(#add-new-button)').remove()
