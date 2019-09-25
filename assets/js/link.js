import barba from '@barba/core';

class Link {
  static init() {
    $(window)
      .keydown(() => {
        Link.trueLink();
      })
      .keyup(() => {
        Link.fakeLink();
      });

    Link.fakeLink();
  }

  static fakeLink(container) {
    if (!container) {
      container = $(document);
    }
    container.find('a[href][href!=""]:not(.no-fake-link)').each(function () {
      let href = $(this).attr('href');
      $(this).removeAttr('href');
      $(this).attr('data-href', href);
      $(this).click(() => {
        barba.go(href);
      });
    });
  }

  static trueLink() {
    $('a[data-href][data-href!=""]:not(.no-fake-link)').each(function () {
      let href = $(this).data('href');

      $(this).attr('href', href);
      $(this).off('click');
    });
  }
}

export default Link;