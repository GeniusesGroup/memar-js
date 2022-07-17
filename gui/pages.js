/* For license and copyright information please see LEGAL file in repository */

import * as page from "./page.js"

Application.pages = {
    _poolByTimeAdded: [],
    _poolByPath: {},
}

/**
 * register given page in the application
 * @param {page.Page} page
 */
Application.RegisterPage = function (page) {
    this.pages._poolByTimeAdded.push(page)
    this.pages._poolByPath[page.Path] = page
}

/**
 * GetPageByPath return a page by given page path
 * @param {string} path 
 * @return {Page} registered page
 */
Application.GetPageByPath = function (path) { return this.pages._poolByPath[path] }

Application.Pages = function () {
    return this.pages._poolByTimeAdded
}
