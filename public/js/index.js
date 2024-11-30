$(function () {
    // Scroll functionality for header
    $(window).on('scroll', function () {
      const scrollTop = $(this).scrollTop();
      if (scrollTop >= 100) {
        $('header').addClass('fixed');
      } else {
        $('header').removeClass('fixed');
      }
    });
  
    // Navigation handling
    let lastId;
    const topMenu = $("#headnav");
    const topMenuHeight = topMenu.outerHeight() + 135;
  
    // All list items
    const menuItems = topMenu.find("a");
  
    // Anchors corresponding to menu items
    const scrollItems = menuItems.map(function () {
      const item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });
  
    // Bind click handler to menu items for smooth scrolling
    menuItems.on('click', function (e) {
      const href = $(this).attr("href");
      const offsetTop = href === "#" ? 0 : $(href).offset().top - 120;
      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 1200);
      e.preventDefault();
    });
  
    // Scroll event for updating active menu item
    $(window).on('scroll', function () {
      const scrollTop = $(this).scrollTop();
      const fromTop = scrollTop + topMenuHeight + 200;
  
      // Get the current scroll item based on position
      const cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) return this;
      });
  
      // Get the id of the current element
      const currentId = cur[cur.length - 1];
      const id = currentId && currentId.length ? currentId[0].id : "";
  
      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter(`[href='#${id}']`).parent().addClass("active");
      }
    });
  
    // Show and hide navigation menu
    $(".showmenu").on('click', function () {
      $("nav").fadeIn();
      $(this).next(".hidemenu").show();
      $('body').addClass('disablescroll');
    });
  
    $(".hidemenu").on('click', function () {
      $("nav").fadeOut();
      $(this).hide();
      $(this).prev(".showmenu").show();
      $('body').removeClass('disablescroll');
    });
  
    // Close navigation on mobile viewport
    const viewportWidth = $(window).width();
    if (viewportWidth < 1200) {
      $("nav a").on('click', function () {
        $(this).parents("nav").fadeOut();
        $(".hidemenu").hide();
        $('body').removeClass('disablescroll');
      });
    }
  });