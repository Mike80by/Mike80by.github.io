/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Loader = __webpack_require__(/*! ./service/loader */ \"./src/service/loader.js\");\nconst Model = __webpack_require__(/*! ./ui/model */ \"./src/ui/model.js\");\nconst Slider = __webpack_require__(/*! ./ui/slider */ \"./src/ui/slider.js\");\n\nconst loader = new Loader();\n\nconst model = new Model();\nmodel.init();\n\nconst slider = new Slider(loader, model);\nslider.init();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/service/loader.js":
/*!*******************************!*\
  !*** ./src/service/loader.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Video = __webpack_require__(/*! ./video */ \"./src/service/video.js\");\n\nclass Loader {\n  constructor() {\n    this.videoCount = 15;\n    this.apiKey = 'AIzaSyBFaWcpZNZBZXgt45kcx0c3GuAJWSS7gQw';\n    this.nextPage = '';\n    this.value = '';\n    this.loading = false;\n  }\n\n  newSearch(value) {\n    this.nextPage = '';\n    this.value = value;\n  }\n\n  getVideos(fn) {\n    if (this.nextPage !== undefined) {\n      const url = `https://www.googleapis.com/youtube/v3/search?pageToken=${this.nextPage}&part=snippet&maxResults=${this.videoCount}&q=${this.value}&key=${this.apiKey}`;\n      fetch(url).then(response => response.json()).then(response => {\n        this.nextPage = response.nextPageToken;\n        this.loading = false;\n        return response.items;\n      }).then(items => items.map(video => video.snippet.thumbnails && video.id.videoId ? new Video(video) : false)).then(videos => this.addStatisticAndPush(videos, fn));\n    }\n  }\n\n  addStatisticAndPush(videos, fn) {\n    videos.forEach(video => {\n      if (video) {\n        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video.videoId}&key=${this.apiKey}`;\n        fetch(url).then(response => response.json()).then(response => {\n          video.addStatistic(response);\n          fn(video);\n        });\n      }\n    });\n  }\n}\n\nmodule.exports = Loader;\n\n//# sourceURL=webpack:///./src/service/loader.js?");

/***/ }),

/***/ "./src/service/video.js":
/*!******************************!*\
  !*** ./src/service/video.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Video {\n  constructor(video) {\n    this.videoId = video.id.videoId;\n    this.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;\n    this.iframe = `https://www.youtube.com/embed/${video.id.videoId}`;\n    this.title = video.snippet.title;\n    this.imgUrl = video.snippet.thumbnails.medium.url;\n    this.channel = video.snippet.channelTitle;\n    this.date = video.snippet.publishedAt.substr(0, 10);\n    this.description = video.snippet.description;\n  }\n\n  addStatistic(statistic) {\n    this.views = statistic.items[0].statistics.viewCount;\n  }\n}\n\nmodule.exports = Video;\n\n//# sourceURL=webpack:///./src/service/video.js?");

/***/ }),

/***/ "./src/ui/model.js":
/*!*************************!*\
  !*** ./src/ui/model.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Model {\n  init() {\n    this.renderHeader();\n    this.renderMain();\n    this.renderFooter();\n    this.renderIframe();\n  }\n\n  renderHeader() {\n    const header = document.createElement('header');\n    const search = document.createElement('div');\n    const searchButton = document.createElement('button');\n    const input = document.createElement('input');\n    const i = document.createElement('i');\n    document.body.appendChild(header);\n    header.appendChild(search);\n    search.appendChild(searchButton);\n    search.appendChild(input);\n    searchButton.appendChild(i);\n    search.classList.add('search');\n    input.setAttribute('type', 'text');\n    input.classList.add('search-input');\n    input.setAttribute('id', 'search-input');\n    input.setAttribute('autofocus', 'true');\n    searchButton.setAttribute('type', 'submit');\n    searchButton.classList.add('search-button');\n    searchButton.setAttribute('id', 'search-button');\n    i.classList.add('fa', 'fa-2x', 'fa-search');\n  }\n\n  renderMain() {\n    const main = document.createElement('main');\n    const slides = document.createElement('div');\n    document.body.appendChild(main);\n    main.appendChild(slides);\n    slides.classList.add('slides');\n    slides.setAttribute('id', 'slides');\n  }\n\n  renderFooter() {\n    const footer = document.createElement('footer');\n    const pages = document.createElement('ul');\n    document.body.appendChild(footer);\n    footer.appendChild(pages);\n    pages.classList.add('pagination');\n    pages.setAttribute('id', 'pages');\n  }\n\n  renderIframe() {\n    const iframeBg = document.createElement('div');\n    const iframe = document.createElement('iframe');\n    document.body.appendChild(iframeBg);\n    document.body.appendChild(iframe);\n    iframeBg.setAttribute('id', 'iframeBg');\n    iframeBg.classList.add('iframeBg');\n    iframeBg.addEventListener('mousedown', () => {\n      iframe.style.visibility = 'hidden';\n      iframe.setAttribute('src', '');\n      iframeBg.style.visibility = 'hidden';\n    });\n    iframe.setAttribute('id', 'iframe');\n    iframe.setAttribute('frameborder', '0');\n    iframe.setAttribute('allowfullscreen', '');\n  }\n\n  renderSlide(slide) {\n    const slides = document.getElementById('slides');\n    const slideDiv = document.createElement('div');\n    const videos = document.createElement('ul');\n    slides.appendChild(slideDiv);\n    slideDiv.appendChild(videos);\n    slideDiv.classList.add('slide');\n    slideDiv.style.left = `${(slides.children.length - 1) * document.documentElement.clientWidth}px`;\n    videos.classList.add('videos');\n    slide.forEach(item => {\n      this.renderVideo(item, videos);\n    });\n  }\n\n  renderVideo(video, videos) {\n    const li = document.createElement('li');\n    videos.appendChild(li);\n    li.setAttribute('data-iframe', `${video.iframe}`);\n    li.addEventListener('mousedown', () => {\n      if (document.getElementById('iframeBg').style.visibility !== 'visible') this.isClick = true;\n    });\n    li.addEventListener('mousemove', () => {\n      this.isClick = false;\n    });\n    li.addEventListener('mouseup', e => {\n      if (this.isClick) {\n        this.isClick = false;\n        document.getElementById('iframe').setAttribute('src', e.currentTarget.getAttribute('data-iframe'));\n        document.getElementById('iframe').style.visibility = 'visible';\n        document.getElementById('iframeBg').style.visibility = 'visible';\n      }\n    });\n    this.renderTitle(li, video.title, video.href);\n    this.renderImg(li, video.imgUrl);\n    this.renderData(li, video.date, video.channel, video.views);\n    this.renderDescription(li, video.description);\n  }\n\n  renderTitle(li, title, href) {\n    const titleDiv = document.createElement('div');\n    const a = document.createElement('a');\n    const h3 = document.createElement('h3');\n    li.appendChild(titleDiv);\n    titleDiv.appendChild(a);\n    a.appendChild(h3);\n    titleDiv.classList.add('title-video');\n    a.setAttribute('href', href);\n    h3.innerHTML = title;\n  }\n\n  renderImg(li, imgUrl) {\n    const img = document.createElement('div');\n    li.appendChild(img);\n    img.classList.add('title-img');\n    img.style.background = `url(${imgUrl}) center no-repeat`;\n  }\n\n  renderData(li, date, channel, views) {\n    const info = document.createElement('div');\n    let i;\n    let p;\n    let span;\n    li.appendChild(info);\n    info.classList.add('info');\n\n    // channel\n    p = document.createElement('p');\n    i = document.createElement('i');\n    span = document.createElement('span');\n    info.appendChild(p);\n    p.appendChild(i);\n    p.appendChild(span);\n    i.classList.add('fa', 'fa-2x', 'fa-male');\n    span.classList.add('text', 'text-data');\n    span.innerHTML = channel;\n\n    // date\n    p = document.createElement('p');\n    i = document.createElement('i');\n    span = document.createElement('span');\n    info.appendChild(p);\n    p.appendChild(i);\n    p.appendChild(span);\n    i.classList.add('fa', 'fa-2x', 'fa-calendar');\n    span.classList.add('text', 'text-data');\n    span.innerHTML = date;\n\n    // views\n    p = document.createElement('p');\n    i = document.createElement('i');\n    span = document.createElement('span');\n    info.appendChild(p);\n    p.appendChild(i);\n    p.appendChild(span);\n    i.classList.add('fa', 'fa-2x', 'fa-eye');\n    span.classList.add('text', 'text-data');\n    span.innerHTML = views;\n  }\n\n  renderDescription(li, description) {\n    const info = document.createElement('div');\n    const p = document.createElement('p');\n    const span = document.createElement('span');\n    li.appendChild(info);\n    info.appendChild(p);\n    p.appendChild(span);\n    info.classList.add('info');\n    p.style.height = '110px';\n    p.classList.add('description');\n    span.classList.add('text');\n    span.style.height = 'inherit';\n    span.innerHTML = description;\n  }\n\n  renderPages(activ, count) {\n    const pages = document.getElementById('pages');\n    pages.innerHTML = '';\n    const leftPage = document.documentElement.clientWidth < 461 ? Math.max(1, activ - 1) : Math.max(1, activ - 2);\n    const rightPage = document.documentElement.clientWidth < 461 ? Math.min(Math.max(1, activ - 1) + 2, count) : Math.min(Math.max(1, activ - 2) + 4, count);\n    for (let i = leftPage; i <= rightPage; i += 1) {\n      const li = document.createElement('li');\n      const a = document.createElement('a');\n      pages.appendChild(li);\n      li.appendChild(a);\n      if (activ === i) li.classList.add('active');\n      a.innerHTML = i;\n    }\n  }\n\n  clear() {\n    document.getElementById('slides').innerHTML = '';\n    document.getElementById('search-input').focus();\n    document.getElementById('slides').style.transform = 'translateX(0px)';\n    document.getElementById('pages').innerHTML = '';\n  }\n}\n\nmodule.exports = Model;\n\n//# sourceURL=webpack:///./src/ui/model.js?");

/***/ }),

/***/ "./src/ui/slider.js":
/*!**************************!*\
  !*** ./src/ui/slider.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Slider {\n  constructor(loader, model) {\n    this.loader = loader;\n    this.model = model;\n    this.slides = [];\n    this.buffer = [];\n    this.videosCount = 4;\n  }\n\n  init() {\n    this.eventListeners();\n  }\n\n  newSearch() {\n    if (!this.loader.loading) {\n      this.loader.loading = true;\n      this.clearSlides();\n      this.loader.newSearch(document.getElementById('search-input').value);\n      const that = this;\n      const fn = function fn(a) {\n        return that.pushVideo(a);\n      };\n      this.loader.getVideos(fn);\n    }\n  }\n\n  clearSlides() {\n    this.slides = [];\n    this.buffer = [];\n    this.model.clear();\n  }\n\n  videosInSlide() {\n    if (document.documentElement.clientWidth <= 647) return 1;\n    return Math.ceil((document.documentElement.clientWidth - 647) / 304) + 1;\n  }\n\n  pushVideo(video) {\n    this.buffer.push(video);\n    this.videosCount = this.videosInSlide();\n    if (this.buffer.length === this.videosCount) {\n      this.slides.push(this.buffer);\n      this.model.renderSlide(this.slides[this.slides.length - 1]);\n      this.model.renderPages(this.getActiveSlideNumber() || 1, this.slides.length);\n      this.buffer = [];\n    }\n  }\n\n  slideMove(newId) {\n    const slideLeft = (newId - 1) * document.documentElement.clientWidth;\n    this.model.renderPages(newId, this.slides.length);\n    document.getElementById('slides').style.transform = `translateX(${-slideLeft}px)`;\n    this.loadVideos();\n  }\n\n  loadVideos() {\n    if (this.getActiveSlideNumber() >= this.slides.length - 3 && !this.loader.loading) {\n      this.loader.loading = true;\n      const that = this;\n      const fn = function fn(a) {\n        return that.pushVideo(a);\n      };\n      this.loader.getVideos(fn);\n    }\n  }\n\n  getActiveSlideNumber() {\n    const pages = document.getElementById('pages').children;\n    for (let i = 0; i < pages.length; i += 1) {\n      if (pages[i].classList.contains('active')) {\n        return Number(pages[i].children[0].innerHTML);\n      }\n    }\n    return undefined;\n  }\n\n  // eventListeners\n\n  eventListeners() {\n    this.eventSearch();\n    this.eventPages();\n    this.eventSwipe();\n    this.eventResize();\n  }\n\n  eventSearch() {\n    document.getElementById('search-input').addEventListener('keyup', e => {\n      if (e.keyCode === 13) this.newSearch();\n    });\n    document.getElementById('search-button').addEventListener('click', () => this.newSearch());\n  }\n\n  eventPages() {\n    document.getElementById('pages').addEventListener('click', e => {\n      if (e.target.tagName === 'A') {\n        this.slideMove(parseInt(e.target.innerHTML, 10));\n      }\n    });\n  }\n\n  eventSwipe() {\n    this.eventMouseSwipe();\n    this.eventTouchSwipe();\n  }\n\n  eventMouseSwipe() {\n    document.getElementById('slides').addEventListener('mousedown', e => {\n      document.getElementById('slides').style['transition-duration'] = '0s';\n      this.mouseDown = true;\n      this.startSwipe = e.pageX;\n      this.startSwipeSlidesPos = parseInt(document.getElementById('slides').style.transform.substr(11), 10);\n    });\n    document.getElementById('slides').addEventListener('mousemove', e => {\n      if (this.mouseDown) {\n        document.getElementById('slides').style.transform = `translateX(${this.startSwipeSlidesPos - this.startSwipe + e.pageX}px)`;\n      }\n    });\n    document.addEventListener('mouseup', e => {\n      if (this.mouseDown) {\n        document.getElementById('slides').style['transition-duration'] = '1s';\n        this.mouseDown = false;\n        if (this.startSwipe - e.pageX < -100) {\n          this.slideMove(this.getActiveSlideNumber() - 1);\n        } else if (this.startSwipe - e.pageX > 100) {\n          this.slideMove(this.getActiveSlideNumber() + 1);\n        } else {\n          this.slideMove(this.getActiveSlideNumber());\n        }\n      }\n    });\n  }\n\n  eventTouchSwipe() {\n    document.getElementById('slides').addEventListener('touchstart', e => {\n      document.getElementById('slides').style['transition-duration'] = '0s';\n      this.mouseDown = true;\n      this.startSwipe = e.changedTouches[0].pageX;\n      this.startSwipeSlidesPos = parseInt(document.getElementById('slides').style.transform.substr(11), 10);\n    });\n    document.getElementById('slides').addEventListener('touchmove', e => {\n      if (this.mouseDown) {\n        document.getElementById('slides').style.transform = `translateX(${this.startSwipeSlidesPos - this.startSwipe + e.changedTouches[0].pageX}px)`;\n      }\n    });\n    document.addEventListener('touchend', e => {\n      if (this.mouseDown) {\n        document.getElementById('slides').style['transition-duration'] = '1s';\n        this.mouseDown = false;\n        if (this.startSwipe - e.changedTouches[0].pageX < -100) {\n          this.slideMove(this.getActiveSlideNumber() - 1);\n        } else if (this.startSwipe - e.changedTouches[0].pageX > 100) {\n          this.slideMove(this.getActiveSlideNumber() + 1);\n        } else {\n          this.slideMove(this.getActiveSlideNumber());\n        }\n      }\n    });\n  }\n\n  eventResize() {\n    window.addEventListener('resize', () => {\n      const leftVideo = this.videosCount * (this.getActiveSlideNumber() - 1) + 1 || 1;\n      const { slides } = this;\n      slides.push(this.buffer);\n      this.clearSlides();\n      slides.forEach(slide => slide.forEach(video => this.pushVideo(video)));\n      const newSlideId = Math.floor(leftVideo / this.videosInSlide() - 0.01);\n      document.getElementById('slides').style.transform = `translateX(${-newSlideId * document.documentElement.clientWidth}px)`;\n      this.model.renderPages(newSlideId + 1, this.slides.length);\n    });\n  }\n}\n\nmodule.exports = Slider;\n\n//# sourceURL=webpack:///./src/ui/slider.js?");

/***/ })

/******/ });