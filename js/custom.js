(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

function messageUpdater() {
  let messageBlock = document.querySelector(".warning");
  let counter = 1;
  counter = counter++;
  messageBlock.value = `You have stared into the abyss for more than ${counter} minute, and now the abyss is staring into you.`;
  console.log("1 minute gone");
}
// show secret message after 1 minute of ranning
setInterval(messageUpdater, 60000);

// keycodes for cathing keys pressing events
let subMenuItem = document.querySelector(".has-submenu");
let keys = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
  space: 32,
  enter: 13,
  esc: 27,
};

let direction = {
  37: -1,
  38: -1,
  39: 1,
  40: 1,
};

// when we focused on submenu - press Space/Enter to open submenu
subMenuItem.onfocus = document.addEventListener(
  "keydown",
  keydownEventListener
);
// when we hover mouse on submenu - open/close submenu
subMenuItem.onmouseover = openSubmenu();
subMenuItem.onmouseout = closeSubmenu();

function keydownEventListener(event) {
  var key = event.keyCode;

  switch (key) {
    case keys.enter:
    case keys.space:
      event.preventDefault();
      openSubmenu(event);
      break;
    case keys.esc:
      closeSubmenu(event);
      break;
  }
}

function openSubmenu() {
  console.log("added open class");
  subMenuItem.classList.add("open");
  subMenuItem.setAttribute("aria-expanded", "true");
}

function closeSubmenu() {
  console.log("removed open class");
  subMenuItem.classList.remove("open");
  subMenuItem.setAttribute("aria-expanded", "false");
}
