/* For license and copyright information please see LEGAL file in repository */

// If description meta tag is important why it doesn't have document object like title!!?
// We add it here to update it content later dynamically on every page.
window.document.description = document.createElement('meta')
window.document.description.name = "description"
window.document.head.appendChild(window.document.description)

// Due to application is CSR (Client side rendering) we need to control robot to allow||disallow indexing
// - Prevent some pages to index
// - we can't change status code to 404
// https://developers.google.com/search/reference/robots_meta_tag
window.document.robots = document.createElement('meta')
window.document.robots.name = "robots"
window.document.head.appendChild(window.document.robots)
