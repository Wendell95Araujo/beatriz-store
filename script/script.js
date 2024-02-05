(function () {
  verificarLog();
  exibirNome();
})();

var count = 0;
var accessForm = "";

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

function verificarLog() {
  var logado = localStorage.getItem("user-log");
  var pageSelect = $(".page-select").text();

  if (logado !== null) {
    if (logado === 'true') {
      $(".user-off").css("display", "none");
      $(".user-on").css("display", "block");
      console.log("logado")
    } else {
      $(".user-off").css("display", "block");
      $(".user-on").css("display", "none");
      if (pageSelect === "minha-conta")
        window.location.replace("../index.html");
    }
  } else {
    $(".user-off").css("display", "block");
    $(".user-on").css("display", "none");
    localStorage.setItem("user-log", false);
    if (pageSelect === "minha-conta") window.location.replace("../index.html");
  }
}

function exibirNome() {
  var logado = localStorage.getItem("user-log");
  var nomeCompleto = localStorage.getItem("name");
  var nome = ''
  if (nomeCompleto !== null && nomeCompleto != undefined) {
    nome = nomeCompleto.split(" ")[0]
  }
  if (logado !== null) {
    if (logado === 'true') {
      $(".nome-boas-vindas").text(`Seja bem-vinda, ${nome}!`);
    }
  }
}

function showFormOptions() {
  if (accessForm === "new-login") {
    $(".new-account").css("display", "none");
    $(".new-login").css("display", "block");
    $("#button-submit").text("Login");
  } else if (accessForm === "new-account") {
    $(".new-login").css("display", "none");
    $(".new-account").css("display", "block");
    $("#button-submit").text("Criar conta")
  }
}

function handleFormAction() {
  if (accessForm === "new-login") {
    login();
  } else if (accessForm === "new-account") {
    createNewAccount()
  }
}

function createNewAccount() {
  var name = $("#name-input").val();
  var email = $("#email-input").val();
  var user = $("#user-input").val();
  var password = $("#password-input").val();
  var passwordConfirm = $("#password-confirm-input").val();
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  name = titleCase(name);

  if (name === "") {
    swal({
      title: "Erro!",
      text: "Preencha o campo nome.",
      icon: "error",
      button: "OK",
    });
  } else if (email === "") {
    swal({
      title: "Erro!",
      text: "Preencha o campo e-mail.",
      icon: "error",
      button: "OK",
    });
  } else if (!emailReg.test(email)) {
    swal({
      title: "Erro!",
      text: "Insira um email válido.",
      icon: "error",
      button: "OK",
    });
  } else if (user === "") {
    swal({
      title: "Erro!",
      text: "Preencha o campo usuário.",
      icon: "error",
      button: "OK",
    });
  } else if (password === "") {
    swal({
      title: "Erro!",
      text: "Preencha o campo senha.",
      icon: "error",
      button: "OK",
    });
  } else if (password !== passwordConfirm) {
    swal({
      title: "Erro!",
      text: "Senhas diferentes",
      icon: "error",
      button: "OK",
    });
  } else {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("user", user);
    localStorage.setItem("password", password);

    swal({
      title: "Tudo certo!",
      text: "Conta criada com sucesso!",
      icon: "success",
      button: {
        ok: {
          text: "Fazer login",
          value: "ok",
        },
      },
      closeOnClickOutside: false,
      closeOnEsc: false,
    })
          $(".container-formulario").css("display", "block");
          accessForm = "new-login";
          showFormOptions();
      }
    });
  }
}

function login() {
  var userInput = $("#user-input").val();
  var passwordInput = $("#password-input").val();
  var userSave = localStorage.getItem("user");
  var passwordSave = localStorage.getItem("password");

  if (userInput !== userSave || passwordInput !== passwordSave) {
    swal({
      title: "Erro!",
      text: "Usuário e/ou senha inválida.",
      icon: "error",
      button: "Tentar novamente",
    });
  } else {
    localStorage.setItem("user-log", true);
    window.location.reload();
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
  accessForm = "new-login";
  showFormOptions();
});

$("#accessNewAccount").on("click", function () {
  $(".container-formulario").css("display", "block");
  accessForm = "new-account";
  showFormOptions();
});

$("#accessLogout").on("click", function () {
  localStorage.setItem("user-log", false);
  swal({
      text: "Você saiu!",
      icon: "success",
      buttons: false,
      timer: 3000,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
  setTimeout(function() {
  window.location.reload();
}, "3000");
});

$("#button-submit").on("click", function (e) {
  e.preventDefault();
  handleFormAction();
});

$("#button-cancel").on("click", function () {
  $(".container-formulario").css("display", "none");
});
