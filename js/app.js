window.onload = function () {
  // バーガーメニュー
  document
    .getElementById("js-burger-btn")
    .addEventListener("click", function () {
      const header = document.getElementById("header");
      const targetWindowSize = 1110;
      // pcサイズ時に表示されるメニュー
      const navMenuPc = document.getElementById("js-nav-menu-pc");
      // tablet,spサイズに表示されるメニュー
      const navMenuTablet = document.getElementById("js-nav-menu-tablet-sp");
      const burgerBtn = this;
      const body = document.body;

      // 画面をスクロールをさせるかさせないか
      const isScroll = function (event) {
        if (burgerBtn.classList.contains("-active")) {
          event.preventDefault();
        } else {
          event.stopPropagation();
        }
      };

      // pcのメニューかtabletspメニューを開くかの判定
      if (window.innerWidth < targetWindowSize) {
        // pcサイズからメニューを開いたまま、
        // tabletサイズ以下にwindowを変更した際、メニューのみを閉じる処理の判定
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          return;
        }
        // tablet・spのメニューが閉じる時
        if (navMenuTablet.classList.contains("nav-menu-active")) {
          navMenuTablet.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          // ヘッダーにjs-nav-menu-activeを付与させているのは、
          // メニューを開いた時にグローバルメニューをopcityで透明化する為
          header.classList.remove("js-nav-menu-active");
          // bodyにnav-menu-activeを付与しているのは
          // 後ろの画面のスクロールを制御する為
          body.classList.remove("nav-menu-active");
          document.removeEventListener("touchmove", isScroll, {
            passive: false,
          });
          return;
        } else {
          navMenuTablet.classList.add("nav-menu-active");
          burgerBtn.classList.add("burger-btn-active");
          header.classList.add("js-nav-menu-active");
          body.classList.add("nav-menu-active");
          document.addEventListener("touchmove", isScroll, { passive: false });
          return;
        }
      } else {
        // tabletサイズからメニューを開いたまま、
        // pcサイズにwindowを変更した際、メニューのみを閉じる処理の判定
        if (navMenuTablet.classList.contains("nav-menu-active")) {
          navMenuTablet.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          return;
        }
        // pcのメニュー 閉じる時
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          body.classList.remove("nav-menu-active");
          document.removeEventListener("mousewheel", isScroll, {
            passive: false,
          });

          return;
        } else {
          navMenuPc.classList.add("nav-menu-active");
          burgerBtn.classList.add("burger-btn-active");
          header.classList.add("js-nav-menu-active");
          body.classList.add("nav-menu-active");
          document.addEventListener("mousewheel", isScroll, {
            passive: false,
          });
        }
      }
    });
  // end バーガーメニュー

  // 固定ヘッダーのスクロールアニメーション
  document.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const fv = document.getElementById("js-fv");
    const target = fv.offsetTop + fv.clientHeight * 0.5;
    const headerHeight = 54;

    // 現在のスクロール量に対して、固定ヘッダーの表示非表示の判定
    if (window.pageYOffset > target) {
      header.classList.add("start-fixed");
      header.classList.remove("end-fixed");
    } else if (window.pageYOffset < headerHeight) {
      header.classList.remove("end-fixed");
    } else {
      if (header.classList.contains("start-fixed")) {
        header.classList.add("end-fixed");
        header.classList.remove("start-fixed");
      }
    }
  });
  // end 固定ヘッダーのスクロールアニメーション

  // fvスライダー
  let fvSlider = new Swiper(".swiper-container", {
    autoplay: {
      delay: 2000,
    },

    loop: true,
    speed: 1500,

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
      smoothScrollTriger[i].addEventListener("click", function () {
        const navMenuPc = document.getElementById("js-nav-menu-pc");
        const navMenuTabletAndSp = document.getElementById(
          "js-nav-menu-tablet-sp"
        );
        const burgerBtn = document.getElementById("js-burger-btn");
        const header = document.getElementById("header");
        const body = document.body;

        // pcナビメニューを開いていたら閉じる
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          body.classList.remove("nav-menu-active");
        }

        // tablet以下ナビメニューを開いていたら閉じる
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
