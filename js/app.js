window.onload = function () {
  // start バーガーメニュー
  document
    .getElementById("js-burger-btn")
    .addEventListener("click", function () {
      const header = document.getElementById("js-header");
      const targetWindowSize = 1110;
      const navMenuPc = document.getElementById("js-nav-menu-pc");
      const navMenuTabletUnder = document.getElementById(
        "js-nav-menu-tablet-sp"
      );
      const burgerBtn = this;

      // pcのメニューかtabletspメニューかの判定
      if (window.innerWidth < targetWindowSize) {
        // pcサイズからメニューを開いたまま、
        // tabletサイズ以下にwindowを変更した際、メニューのみを閉じる処理の判定
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          return;
        }
        // tablet・spサイズ 閉じる時
        if (navMenuTabletUnder.classList.contains("nav-menu-active")) {
          navMenuTabletUnder.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          // document.removeEventListener("touchmove", noScroll, {
          //   passive: false,
          // });
          console.log("タブレットを閉じる時");
          return;
        } else {
          navMenuTabletUnder.classList.add("nav-menu-active");
          burgerBtn.classList.add("burger-btn-active");
          header.classList.add("js-nav-menu-active");
          // document.addEventListener("touchmove", noScroll, {
          //   passive: false,
          // });
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
        // pcサイズ 閉じる時
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
          // document.removeEventListener("mousewheel", noScroll, {
          //   passive: false,
          // });
          console.log("pcを閉じる時");

          return;
        } else {
          navMenuPc.classList.add("nav-menu-active");
          burgerBtn.classList.add("burger-btn-active");
          header.classList.add("js-nav-menu-active");
          document.addEventListener("mousewheel", noScroll, {
            passive: false,
          });
          console.log("pcを開く時");
        }
      }
    });
  // end バーガーメニュー

  // 固定ヘッダーのスクロールアニメーション
  document.addEventListener("scroll", function () {
    const header = document.getElementById("js-header");
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

  メニューからの遷移時のスムースアニメーション;
  const smoothAction = function () {
    const smoothScrollTriger = document.querySelectorAll("#js-nav-menu-target");

    for (let i = 0; i < smoothScrollTriger.length; i++) {
      smoothScrollTriger[i].addEventListener("click", function (e) {
        e.preventDefault();

        const headerHeight = 54;
        const navMenuPc = document.getElementById("js-nav-menu-pc");
        const navMenuTabletAndSp = document.getElementById(
          "js-nav-menu-tablet-sp"
        );
        const burgerBtn = document.getElementById("js-burger-btn");
        const top = "js-header";
        const header = document.getElementById("js-header");

        // ナビメニューを開いていたら閉じる処理
        if (navMenuPc.classList.contains("nav-menu-active")) {
          navMenuPc.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
        }

        if (navMenuTabletAndSp.classList.contains("nav-menu-active")) {
          navMenuTabletAndSp.classList.remove("nav-menu-active");
          burgerBtn.classList.remove("burger-btn-active");
          header.classList.remove("js-nav-menu-active");
        }

        // 属性を取得
        let href = smoothScrollTriger[i].getAttribute("href");
        // 属性からターゲットとなる箇所を取得して、DOMから取得
        let targetElement = document.getElementById(href.replace("#", "js-"));

        if (targetElement) {
          if (targetElement.id === top) {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            return;
          } else {
            // getBoundingClientRect = 現在表示されている画面の上部の高さを取得する
            // ターゲットの上から見た位置を取得する。
            const rect = targetElement.getBoundingClientRect().top;
            // 現在のスクロール量を取得する
            const offset = window.pageYOffset;

            const target = rect + offset - headerHeight;

            window.scrollTo({
              top: target,
              behavior: "smooth",
            });
          }
        }
      });
    }
  };

  var scroll = new SmoothScroll('a[href*="#"]', {});
};
