(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("aria-expanded", "true");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute("aria-expanded", "false");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
      tab.setAttribute("aria-expanded", "true");
    } else {
      tab.style.display = "none";
      tab.setAttribute("aria-expanded", "false");
    }
  });
}

function messageUpdater() {
  let messageBlock = document.querySelector(".warning");
  let counter = 1;
  counter = counter++;
  messageBlock.value = `You have stared into the abyss for more than ${counter} minute, and now the abyss is staring into you.`;
  console.log("1 minute gone");
}

setInterval(messageUpdater, 60000);
