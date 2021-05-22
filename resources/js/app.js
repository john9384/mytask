import "../css/app.css";
import M from "materialize-css";

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
  instances.dismissible = false;

  var submit = document.querySelector("form");
  submit.addEventListener("click", () => {
    preventDefault();
  });

  let notification = document.querySelector(".flash-note");
  setTimeout(() => {
    notification.style.display = "none";
  }, 1500);

  const sidenav = document.querySelectorAll(".sidenav");
  const sidenav_instance = M.Sidenav.init(sidenav);
});
