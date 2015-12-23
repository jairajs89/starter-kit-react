React Starter Kit
=================

[![Build Status](https://travis-ci.org/jairajs89/starter-kit-react.png?branch=master)](https://travis-ci.org/jairajs89/starter-kit-react)


### Setup

```bash
git clone git@github.com:jairajs89/starter-kit-react.git
cd starter-kit-react
npm install
```

### Run debug server

```bash
npm start
```

Go to `http://localhost:5000/` in your browser

### Run test suite

```bash
npm test
```

The test suite includes linting of styles and scripts

### Code structure

```
src/
    index.jade
    main.js
    xlib/
    lib/
    component/
    style/
    img/
test/
    lib/
    component/
```

* **`src/`** All of our shipped code
* **`src/index.jade`** Root file that compiles to HTML, put file dependencies here
* **`src/main.js`** Root JS file that acts like the main method, all other files simply hold classes
* **`src/xlib/`** External dependencies
* **`src/lib/`** Internal libraries and utilities
* **`src/component/`** UI component classes (built using React)
* **`src/style/`** LESS style files (per component)
* **`src/img/`** Static images

### External documentation

* [JavaScript / ES6](http://es6-features.org/)
* [React](http://facebook.github.io/react/docs/getting-started.html)
* [Less](http://lesscss.org)
* [Jade](http://jade-lang.com)
* [Jasmine](http://jasmine.github.io/2.3/introduction.html)
