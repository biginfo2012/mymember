// You can customize the theme with the help of this file

//Template config options
const themeConfig = {
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    routerTransition: "fadeIn", // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: "vertical", // vertical, horizontal
    contentWidth: "boxed", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "floating", // static , sticky , floating, hidden
      backgroundColor: "white" // BS color options [primary, success, etc]
    },
    footer: {
      type: "static" // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  },// options[String]: "vertical"(default), "horizontal"
  theme: "lightf", // options[String]: 'light'(default), 'dark', 'semi-dark'
  sidebarCollapsed: false, // options[Boolean]: true, false(default)
  navbarColor: "default", // options[String]: default / primary / success / danger / info / warning / dark
  navbarType: "floating", // options[String]: floating(default) / static / sticky / hidden
  footerType: "static", // options[String]: static(default) / sticky / hidden
  disableCustomizer: true, // options[Boolean]: true, false(default)
  hideScrollToTop: false, // options[Boolean]: true, false(default)
  disableThemeTour: false, // options[Boolean]: true, false(default)
  menuTheme: "primary", // options[String]: primary / success / danger / info / warning / dark
  direction: "ltr" // options[String] : ltr / rtl
};

export default themeConfig;
