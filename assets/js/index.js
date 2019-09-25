import '@babel/polyfill';

import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';

import Link from './link';

import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;

class App {
  static start() {
    return new App();
  }

  constructor() {
    this.views = {};

    Promise
      .all([
        App.domReady(),
      ])
      .then(this.init.bind(this));
  }

  static domReady() {
    return new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }

  static showPage() {
    document.documentElement.classList.add('ready');
    console.log(`
%cWebsite made by

Studio Push.%c
(https://studio.push.com)
      `, 'font-family: Helvetica, sans-serif;font-size:26px;color:black;', 'font-size: 10px;');
  }

  initView(namespace, container) {
    let jContainer = $(container)

    // Update link without href
    Link.fakeLink(jContainer);

    // every view should have an init method
    if (this.views[namespace] && this.views[namespace] instanceof Array) {
      this.views[namespace].forEach((i) => {
        i.init(jContainer);
      });
    } else if (this.views[namespace]) {
      this.views[namespace].init(jContainer);
    }
  }

  destroyView(namespace, container) {
    // every view should have an init method
    if (this.views[namespace] && this.views[namespace] instanceof Array) {
      this.views[namespace].forEach((i) => {
        i.destroy($(container));
      });
    } else if (this.views[namespace]) {
      this.views[namespace].destroy($(container));
    }
  }

  init() {
    barba.use(barbaPrefetch);

    Link.init();

    // first init view
    const currentNamespace = $('[data-barba-namespace]').data('barba-namespace');
    this.initView(currentNamespace, document);

    try {
      barba.hooks.beforeEnter(({ next }) => {
        // init view before transition
        // This way we can use the transition when the next wrapper is already init
        this.initView(next.namespace, next.container);
      });
      barba.hooks.afterLeave(({ current }) => {
        // destroy old view after transition
        this.destroyView(current.namespace, current.container);
      });

      /*
        Class for barba transitioning
      */
      barba.hooks.before(() => {
        barba.wrapper.classList.add('is-animating');
      });
      barba.hooks.after(() => {
        barba.wrapper.classList.remove('is-animating');
      });

      barba.init({
        timeout: 5000,
        // debug: true,
        sync: true,
        transitions: [],
      });
    } catch (err) {
      console.error(err);
    }

    App.showPage();
  }
}

App.start();

