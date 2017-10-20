
// window.jQuery = $ = require('jquery');
// var bootstrap = require('bootstrap-sass');

const render = require('./renderers/render.js');

const boardHTML = document.getElementById('board');

render.emptyCells(boardHTML, 9);
