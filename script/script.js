(function () {
  verificarLog();
})();

var count = 0;
var accessForm = ""

function verificarLog() {
  var logado = localStorage.getItem("user-log");

  if (logado !== null) {
    if (logado === true) {
      $(".user-off").css("display", "none");
      $(".user-on").css("display", "block");
    } else {
      $(".user-off").css("display", "block");
      $(".user-on").css("display", "none");
    }
  } else {
    $(".user-off").css("display", "block");
    $(".user-on").css("display", "none");
    localStorage.setItem("user-log", false);
  }
}

function showFormOptions() {
    if (accessForm === "new-login") {
        $(".new-account").css("display", "none");
        $(".new-login").css("display", "block");
    } else if (accessForm === "new-account") {
        $(".new-login").css("display", "none");
        $(".new-account").css("display", "block");
    }
}



$(".menu-icon").on("click", function () {
  if (count === 0) {
    $(".sub-menu").css("display", "block");
    count++;
  } else {
    $(".sub-menu").css("display", "none");
    count = 0;
  }
});

$("#accessLogin").on("click", function () {
    $(".container-formulario").css("display", "block");
    $("html").css("overflow-y", "hidden");
    accessForm = "new-login"
    showFormOptions();
});

$("#accessNewAccount").on("click", function () {
    $(".container-formulario").css("display", "block");
    $("html").css("overflow-y", "hidden");
    accessForm = "new-account"
    showFormOptions();
});

$("#accessMyAccount").on("click", function () {
    
});

$("#accessLogout").on("click", function () {

});

