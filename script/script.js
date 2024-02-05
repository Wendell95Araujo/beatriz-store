(function () {
  verificarLog();
  exibirNome();
  carouselSlide();
})();

$(document).ready(function() {
  carouselItens();
})

function carouselSlide() {
  var slids = $(".slider [type=radio]"); // busca os radios na div
  var slids_len = slids.length; // conta o número de radios
  var intervalo = 5; // intervalo em segundos

  function rodar() {
    var slids_ativo = $(".slider [type=radio]:checked")
      .attr("id")
      .match(/\d+/)[0]; // pega o valor numérico do id do radio checado

    if (slids_ativo == slids_len) slids_ativo = 0; // se estiver no último slide, volta pro primeiro

    slids.eq(slids_ativo).prop("checked", true); // checa o radio da vez
  }

  var tempo = setInterval(rodar, intervalo * 1000); // inicia o temporizador

  $(".slider").hover(
    function () {
      // função quando entra o mouse
      clearInterval(tempo); // cancela o temporizador
    },
    function () {
      // função quando retira o mouse
      tempo = setInterval(rodar, intervalo * 1000); // reinicia o temporizador
    }
  );
}

var countCarousel = 0

function carouselItens() {
  var itensInfo = $(".itens-info");
  var rand = function () {
    if ($(window).width() > 500) {
      return;
    } else {
      if (countCarousel == itensInfo.length) {
        countCarousel = 0
      }
      itensInfo.each(function () {
        $(this).hide();
      });
      $(itensInfo[countCarousel]).show();
      countCarousel++
      setTimeout(rand, 3000);
    }
  };
  if ($(window).width() < 500) {
    rand();
  } else {
    itensInfo.show();
  }
}
$(window).resize(function () {
  carouselItens();
});

var count = 0;
var accessForm = "";

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

function verificarLog() {
  var logado = localStorage.getItem("log");
  var pageSelect = $(".page-select").text();

  if (logado !== null) {
    if (logado === "true") {
      $(".user-off").css("display", "none");
      $(".user-on").css("display", "block");
    } else {
      $(".user-off").css("display", "block");
      $(".user-on").css("display", "none");
      if (pageSelect === "minha-conta")
        window.location.replace("../index.html");
    }
  } else {
    $(".user-off").css("display", "block");
    $(".user-on").css("display", "none");
    localStorage.setItem("log", false);
    if (pageSelect === "minha-conta") window.location.replace("../index.html");
  }
}

function exibirNome() {
  var logado = localStorage.getItem("log");
  if (logado !== null) {
    if (logado === "true") {
      var userLogado = localStorage.getItem("user-log");
      var usuarios = JSON.parse(localStorage.getItem("usuarios"));
      var nomeCompleto = "";
      var nome = "";

      var usuarioLog = usuarios.usuarios[userLogado];

      if (usuarioLog) {
        nomeCompleto = usuarioLog.nome;
        nome = nomeCompleto.split(" ")[0];
        $(".nome-boas-vindas").text(`Seja bem-vinda, ${nome}!`);
      }
    }
  }
}

function showFormOptions() {
  if (accessForm === "new-login") {
    $(".new-account").css("display", "none");
    $(".new-login").css("display", "block");
    $(".icon-label").css("display", "inline-block");
    $("#button-submit").text("Login");
  } else if (accessForm === "new-account") {
    $(".new-login").css("display", "none");
    $(".icon-label").css("display", "none");
    $(".new-account").css("display", "block");
    $("#button-submit").text("Criar conta");
  }
}

function handleFormAction() {
  if (accessForm === "new-login") {
    login();
  } else if (accessForm === "new-account") {
    createNewAccount();
  }
}

function createNewAccount() {
  var name = $("#name-input").val();
  var email = $("#email-input").val();
  var user = $("#user-input").val();
  var password = $("#password-input").val();
  var passwordConfirm = $("#password-confirm-input").val();
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var usuarioSave = JSON.parse(localStorage.getItem("usuarios"));

  name = titleCase(name);

  if (usuarioSave !== null && usuarioSave.usuarios.user) {
    swal({
      title: "Erro!",
      text: "Usuário indisponível.",
      icon: "error",
      button: "OK",
    });
  } else if (name === "") {
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
    var usuario = {
      nome: name,
      email: email,
      usuario: user,
      senha: password,
    };

    var usuarios = { usuarios: {} };

    if (usuarioSave) {
      usuarioSave.usuarios[user] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuarioSave));
    } else {
      usuarios.usuarios[user] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    swal({
      title: "Tudo certo!",
      text: "Conta criada com sucesso!",
      icon: "success",
      buttons: false,
      timer: 3000,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
    setTimeout(function () {
      $("#user-input").val("");
      $("#password-input").val("");
      $(".container-formulario").css("display", "block");
      accessForm = "new-login";
      showFormOptions();
    }, "3000");
  }
}

function login() {
  var userInput = $("#user-input").val();
  var passwordInput = $("#password-input").val();
  var usuarios = JSON.parse(localStorage.getItem("usuarios"));

  var usuarioLog = "";
  if (usuarios !== null) {
    usuarioLog = usuarios.usuarios[userInput];
  } else {
    swal({
      title: "Erro!",
      text: "Usuário e/ou senha inválida.",
      icon: "error",
      button: "Tentar novamente",
    });
  }

  if (usuarioLog && usuarioLog.senha === passwordInput) {
    var nome = usuarioLog.nome;
    nome = nome.split(" ")[0];
    localStorage.setItem("log", true);
    localStorage.setItem("user-log", userInput);
    swal({
      title: "Tudo certo!",
      text: "Seja bem-vinda, " + nome + "!",
      icon: "success",
      buttons: false,
      timer: 3000,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    swal({
      title: "Erro!",
      text: "Usuário e/ou senha inválida.",
      icon: "error",
      button: "Tentar novamente",
    });
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
  localStorage.setItem("log", false);
  localStorage.setItem("user-log", "");
  swal({
    text: "Você saiu!",
    icon: "success",
    buttons: false,
    timer: 3000,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  setTimeout(function () {
    window.location.reload();
  }, "3000");
});

$("#button-submit").on("click", function (e) {
  e.preventDefault();
  handleFormAction();
});

$("#button-cancel").on("click", function () {
  window.location.reload();
});
