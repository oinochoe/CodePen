"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pages = require("pages");

var _default = [{
  path: '/',
  exact: true,
  component: _pages.ListPage
}, {
  path: '/post/:id',
  component: _pages.PostPage
}, {
  path: '/page/:page',
  component: _pages.ListPage
}, {
  path: '/tag/:tag/:page?',
  component: _pages.ListPage
}, {
  path: '/editor',
  component: _pages.EditorPage
}];
exports["default"] = _default;