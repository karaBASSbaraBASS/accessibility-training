let keys = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
};

let direction = {
  37: -1,
  38: -1,
  39: 1,
  40: 1,
};

let tablist = document.querySelectorAll('[role="tablist"]')[0];
let panels = document.querySelectorAll('[role="tabpanel"]');
let tabs = document.querySelectorAll('[role="tab"]');

function deactivateAllTabs() {
  for (t = 0; t < tabs.length; t++) {
    tabs[t].setAttribute("tabindex", "-1");
    tabs[t].classList.remove("is-active");
    tabs[t].setAttribute("aria-selected", "false");
    tabs[t].setAttribute("aria-expanded", "false");
  }

  for (p = 0; p < panels.length; p++) {
    panels[p].setAttribute("hidden", "hidden");
    panels[p].classList.remove("is-active");
  }
}

function activateTab(tab) {
  // setFocus = setFocus || true;
  deactivateAllTabs();
  // remove tabindex attribute
  tab.removeAttribute("tabindex");
  // set selected tab
  tab.classList.add("is-active");
  tab.setAttribute("aria-selected", "true");
  tab.setAttribute("aria-expanded", "true");
  tab.setAttribute("tabindex", "0");
  // get the value of aria-controls
  var controls = tab.getAttribute("aria-controls");
  // make tab panel is visible
  var activePanel = document.getElementById(controls);
  activePanel.removeAttribute("hidden");
  activePanel.classList.add("is-active");
  firstFocusableElement = document.querySelector(
    '.tab-pane.is-active *[tabindex="0"]'
  );
  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
}

function determineOrientation(event) {
  var key = event.keyCode;
  var vertical = tablist.getAttribute("aria-orientation") == "vertical";
  var proceed = false;

  if (vertical) {
    if (key === keys.up || key === keys.down) {
      event.preventDefault();
      proceed = true;
    }
  } else {
    if (key === keys.left || key === keys.right) {
      proceed = true;
    }
  }

  if (proceed) {
    switchTabOnArrowPress(event);
  }
}

function switchTabOnArrowPress(event) {
  var pressed = event.keyCode;

  if (direction[pressed]) {
    const { target } = event;

    if (target.index !== undefined) {
      var targetTab = tabs[target.index + direction[pressed]];
      if (targetTab) {
        targetTab.focus();
        activateTab(targetTab, true);
      } else if (pressed === keys.left || pressed === keys.up) {
        focusLastTab();
      } else if (pressed === keys.right || pressed == keys.down) {
        focusFirstTab();
      }
    }
  }
}

function focusFirstTab() {
  tabs[0].focus();
  activateTab(tabs[0], true);
}
function focusLastTab() {
  tabs[tabs.length - 1].focus();
  activateTab(tabs[tabs.length - 1], true);
}

function keydownEventListener(event) {
  var key = event.keyCode;

  switch (key) {
    case keys.end:
      event.preventDefault();
      activateTab(tabs[tabs.length - 1]);
      break;
    case keys.home:
      event.preventDefault();
      activateTab(tabs[0]);
      break;
    case keys.up:
    case keys.down:
      determineOrientation(event);
      break;
  }
}

function keyupEventListener(event) {
  var key = event.keyCode;

  switch (key) {
    case keys.left:
    case keys.right:
      determineOrientation(event);
      break;
    case keys.delete:
      determineDeletable(event);
      break;
  }
}

function clickEventListener(event) {
  var tab = event.currentTarget;
  activateTab(tab, true);
}

for (i = 0; i < tabs.length; ++i) {
  addListeners(i);
}
function addListeners(index) {
  tabs[index].addEventListener("click", clickEventListener);
  tabs[index].addEventListener("keydown", keydownEventListener);
  tabs[index].addEventListener("keyup", keyupEventListener);
  tabs[index].index = index;
}
