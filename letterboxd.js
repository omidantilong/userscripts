// ==UserScript==
// @name        Letterboxd Enhancements
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://letterboxd.com/*
// @grant       none
// @version     1.1.1
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
  width:1200px;
  display:flex;
  align-items:center;

}

body.film.backdropped .site-header {
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

.poster-list.-horizontal {
  display:grid;
  grid-template-columns:repeat(6, 1fr);
  gap:1rem;
  margin-left:0;
}

#favourites .poster-list.-horizontal,
#recent-activity .poster-list.-horizontal {
  grid-template-columns:repeat(4, 1fr);
}

.poster-list.-horizontal .poster-container {
  margin-left:0;
  width:auto;
}
.poster-list.-horizontal .poster,
.poster-list.-p150 .poster {
  margin-left:0 !important;
  aspect-ratio:2/3;
  width:100%;
  height:auto;
}

.poster-list.-horizontal .poster img[width="150"] {
  width:100%;
  height:auto;
  aspect-ratio:2/3;
  object-fit:cover;
}

.poster-list.-horizontal::after {
  display:none;
}

.poster-list .film-detail .film-detail-content {
  float:left;
}

.banner img {
  width:100%;
  height:auto;
}

a.all-link {
  font-size:1rem;
  top:0;
}

.twipsy {
  font-size:1.125rem;
}

.cols-2:before,
.cols-2:after {
display:none;
}

.cols-2 {
  display:grid;
  grid-template-columns:9fr 3fr;
  gap:3rem;
}

.col-16,
.wide-sidebar {
  width:auto;
}
.profile-statistic .definition {
  font-size:1rem;
}

.profile-statistic .value {
  font-size:2rem;
}

`

document.head.appendChild(style)

header.insertAdjacentHTML('afterEnd', formHtml)

//document.querySelector("#find-film").remove()
//document.querySelector('.js-header-signin-form').remove()
//document.querySelector('p:has(#add-new-button)').remove()
