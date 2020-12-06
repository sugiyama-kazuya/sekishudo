window.onload = function () {
  // start バーガーメニュー
  document
    .getElementById("js-burger-btn")
    .addEventListener("click", function () {
      const header = document.getElementById("header");
      const targetWindowSize = 1110;
      const navMenuPc = document.getElementById("js-nav-menu-pc");
      const navMenuTabletUnder = document.getElementById(
        "js-nav-menu-tablet-sp"
      );
      const burgerBtn = this;
      const body = document.body;

      // スクロールをさせるかさせないか
      const isScroll = function (event) {
        if (navMenuPc.classList.contains("nav-menu-active")) {
          event.preventDefault();
        } else {
          event.stopPropagation();
        }
      };

      // pcのメニューかtabletspメニューかの判定
      if (window.innerWidth < targetWindowSize) {
        // pcサイズからメニューを開いたまま、
        // tabletサイズ以下にwindowを変更した際、メニューのみを閉じる処理の判定
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          return;
        }
        // tablet・spのメニューが閉じる時
        if (navMenuTabletUnder.classList.contains("nav-menu-active")) {
          navMenuTabletUnder.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          body.classList.remove("nav-menu-active");

          return;
        } else {
          navMenuTabletUnder.classList.add("nav-menu-active");
          burgerBtn.classList.add("burger-btn-active");
          header.classList.add("js-nav-menu-active");
          body.classList.add("nav-menu-active");
          return;
        }
      } else {
        // tabletサイズからメニューを開いたまま、
        // pcサイズにwindowを変更した際、メニューのみを閉じる処理の判定
        if (navMenuTabletUnder.classList.contains("nav-menu-active")) {
          navMenuTabletUnder.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          return;
        }
        // pcのメニュー 閉じる時
        if (navMenuPc.classList.contains("nav-menu-active")) {
          document.removeEventListener("mousewheel", isScroll, {
            passive: false,
          });
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          body.classList.remove("nav-menu-active");
          // $(window).off("mousewheel");

          return;
        } else {
          document.addEventListener("mousewheel", isScroll, {
            passive: false,
          });
          navMenuPc.classList.add("nav-menu-active");
          burgerBtn.classList.add("burger-btn-active");
          header.classList.add("js-nav-menu-active");
          body.classList.add("nav-menu-active");
        }
      }
    });
  // end バーガーメニュー

  // 固定ヘッダーのスクロールアニメーション
  document.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const fv = document.getElementById("js-fv");
    const getElementDistance = fv.offsetTop + fv.clientHeight * 0.5;
    const headerHeight = 54;

    // 現在のスクロール量に対して、固定ヘッダーの有無を表す処理
    if (window.pageYOffset > getElementDistance) {
      header.classList.add("start-fixed");
      header.classList.remove("end-fixed");
      fv.classList.add("js-nav-menu-active");
    } else if (window.pageYOffset < headerHeight) {
      header.classList.remove("end-fixed");
    } else {
      if (header.classList.contains("start-fixed")) {
        header.classList.add("end-fixed");
        header.classList.remove("start-fixed");
      }
    }
  });

  // fvスライダー
  let fvSlider = new Swiper(".swiper-container", {
    autoplay: {
      delay: 2000,
    },

    loop: true,

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  // メニューからの遷移時のスムースアニメーション;
  const smoothAction = function () {
    const smoothScrollTriger = document.querySelectorAll("#js-nav-menu-target");

    for (let i = 0; i < smoothScrollTriger.length; i++) {
      smoothScrollTriger[i].addEventListener("click", function (e) {
        const navMenuPc = document.getElementById("js-nav-menu-pc");
        const navMenuTabletAndSp = document.getElementById(
          "js-nav-menu-tablet-sp"
        );
        const burgerBtn = document.getElementById("js-burger-btn");
        const header = document.getElementById("header");
        const body = document.body;

        // ナビメニューを開いていたら閉じる処理
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          body.classList.remove("nav-menu-active");
        }

        if (navMenuTabletAndSp.classList.contains("nav-menu-active")) {
          navMenuTabletAndSp.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          body.classList.remove("nav-menu-active");
        }

        const scroll = new SmoothScroll('a[href*="#"]', {
          header: "[data-scroll-header]",
        });
      });
    }
  };
  smoothAction();
};
