/**
 * Provide a polyfill for the FullScreen API
 * jerome.etienne@gmail.com
 * MIT license http://jetienne.mit-license.org/
*/
if ('webkitIsFullScreen' in document) {
  Document.prototype.cancelFullScreen = Document.prototype.webkitCancelFullScreen;
  HTMLElement.prototype.requestFullScreen = HTMLElement.prototype.webkitRequestFullScreen;
} else if ('mozFullScreen' in document) {
  Document.prototype.cancelFullScreen = document.mozCancelFullScreen;
  HTMLElement.prototype.requestFullScreen = HTMLElement.prototype.mozRequestFullScreen;
}
