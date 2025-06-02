// ==UserScript==
// @name        Letterboxd Enhancements
// @namespace   https://github.com/omidantilong/userscripts
// @match       https://letterboxd.com/*
// @grant       none
// @version     1.1.11
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

body.film {
  background:#14181c;
}


body.film.backdropped .site-header {
  background:linear-gradient(0deg, rgb(0 0 0 / 0), #000)
}

body #content {
  position:relative;
  transition:filter 0.1s linear;
}

body.film #content {
  background:none;
}


body:has(a.toggle-menu:hover) .backdrop-container,
body:has(a.toggle-menu:hover) #content,
body:has(.subnav:hover) .backdrop-container,
body:has(.subnav:hover) #content {
  filter:blur(2px);
}

.content-wrap {
  width:1200px;
}

.backdrop-container {
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

.site-header section {
  width:1200px;
  display:flex;
  align-items:center;
}

.site-header .main-nav {
  position:static;
}

.site-header .main-nav .navitem {
  position:relative;
  right:auto !important;
}

.site-header .main-nav > .navitems > .navitem > .subnav {
  background:#1c2129;
  box-shadow:0px 2px 10px rgb(0 0 0 / 0.5);
  border-radius:8px;
  border-top:2px solid #1c2129;
  transform:translateY(-2px);
}

.site-header .main-nav > .navitems > .navitem > .subnav li:not(:first-child) a {
  font-size:1.125rem;
  color:#9ab;
  padding:0.75rem 1.5rem;
}

.site-header .main-nav > .navitems > .navitem > .subnav li:not(:first-child) a:hover {
  text-decoration:underline;
  background:rgb(0 0 0 / 0.5);
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


.site-body.-backdrop {
  padding-top:0;
  margin-top:350px;
}

.profile-header.-is-not-mini-nav nav.profile-navigation {
  border:0;
  border-bottom:1px solid #24303C;
}

.profile-navigation .navlist>.navitem.-active .navlink:before, .profile-navigation .navlist>.navitem.-active .navlink[href]:before {
  left:0.75rem;
  right:0.75rem;
  height:2px;
}


#film-page-wrapper > .col-17 {
  grid-column: 2;
  width:auto;
}

#film-page-wrapper > .col-17 > .col-10 {
  width:580px;
}

#film-page-wrapper > .col-17 > .sidebar {
  min-width:238px;
}

#film-page-wrapper > .col-6.is_stuck {
  position:fixed !important;
  top:20px !important;
}

.ac_results {
  width:300px !important;
}

.ac_results ul {
  max-height:250px !important;
}

.ac_results ul li {
  padding:0.5rem 1rem;
  border-bottom:1px solid rgb(0 0 0 / 0.1);
  cursor:pointer;
  font-size:1.125rem;
}

.ac_results ul li:hover {
  text-decoration:underline;
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
  padding:0.75rem;
  opacity:0.75;
  margin:0 0 0 1rem;
  background:#eee;
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

.poster-list.-p125 {
  display:grid;
  grid-template-columns:repeat(5, 1fr);
  gap:1rem;
  margin-left:0 !important;
}

#favourites .poster-list.-horizontal,
#recent-activity .poster-list.-horizontal {
  grid-template-columns:repeat(4, 1fr);
}

.poster-list.-horizontal .poster-container,
.poster-list.-grid.-constrained.-p125 > .poster-container {
  margin-left:0;
  margin-bottom:0;
  width:auto;
}
.poster-list.-horizontal .poster,
.poster-list.-p150 .poster,
.poster-list.-grid.-constrained.-p125 .poster,
.poster-list.-p150 .poster.-attributed,
.film .poster-list.-p230 .poster {
  margin-left:0 !important;
  margin-bottom:0 !important;
  aspect-ratio:2/3;
  width:100%;
  height:auto !important;
}

/*
.poster.-attributed, .-p150 .poster.-attributed {
  aspect-ratio:30/49;
}
*/

.poster-list.-p125.-grid.-constrained {
  max-width:none;
}

.poster-list.-horizontal .poster img[width="150"],
.poster-list.-p125.-grid.-constrained .poster img[width="125"],
.film .poster-list.-p230 .poster img[width="230"] {
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
.cols-2:after,
.cols-3:before,
.cols-3:after,
.col-6:before,
.col-6:after {
  display:none;
}

.cols-2 {
  display:grid;
  grid-template-columns:9fr 3fr;
  gap:3rem;
}

.cols-3 {
  display:grid;
  grid-template-columns: 3fr 9fr;
  gap:4rem;
}

.col-16,
.col-17,
.col-6,
.wide-sidebar,
.sidebar {
  margin:0;
  width:auto;
}

.films-watched .cols-2 {
  grid-template-columns:1fr;
}

.pagination,
.pagination .paginate-nextprev a {
  font-size:1.5rem;
  overflow:visible;
}

.sorting-selects label,
.smenu-menu,
.smenu-menu li,
.smenu-menu li > .selected,
.smenu-menu li a.item,
.smenu-menu .smenu-selected {
  font-size:1rem;
}

/*
.smenu-menu li,
.smenu-menu li a.item {
color:white;
}*/

.smenu-menu {
  padding:0.5rem;
}

.pagination .paginate-page a,
.pagination .paginate-page span {
  margin:0 0.25rem;
  padding:0.75rem 1rem;
  display:block;
  border-radius:4px;
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
