(function () {
  verificarLog();
  exibirNome();
  carouselSlide();
})();

$(document).ready(function () {
  carouselItens();
});

function carouselSlide() {
  var pageSelect = $(".page-select").text();

  if (pageSelect === "inicio") {
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
}

var countCarousel = 0;

function carouselItens() {
  var itensInfo = $(".itens-info");
  var rand = function () {
    if ($(window).width() > 500) {
      return;
    } else {
      if (countCarousel == itensInfo.length) {
        countCarousel = 0;
      }
      itensInfo.each(function () {
        $(this).hide();
      });
      $(itensInfo[countCarousel]).show();
      countCarousel++;
      setTimeout(rand, 3000);
    }
  };
  if ($(window).width() < 500) {
    rand();
  } else {
    itensInfo.show();
  }
}

var count = 0;

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

var hasError = true;
var hasErrorName = true;
var hasErrorEmail = true;
var hasErrorUser = true;
var hasErrorPassLength = true;
var hasErrorPassLetra = true;
var hasErrorPassMais = true;
var hasErrorPassNumber = true;
var hasErrorPassCharEspecial = true;
var hasErrorPassConfirm = true;

$("#name-input-cadastro").keyup(function () {
  validFormCadastro();

  var name = $(this).val();
  var nomeValido = /^[\wà-ü']{2,}(\s+[\wà-ü']{2,})+$/i

  if (name === "" || name.length < 5 || !nomeValido.test(name)) {
    $("#ValidNome").show();
    hasErrorName = true;
  } else {
    $("#ValidNome").hide();
    hasErrorName = false;
  }
});

$("#email-input-cadastro").keyup(function () {
  validFormCadastro();

  var email = $(this).val();
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  if (email === "" || email.length < 5 || !emailReg.test(email)) {
    $("#ValidEmail").show();
    hasErrorEmail = true;
  } else {
    $("#ValidEmail").hide();
    hasErrorEmail = false;
  }
});

$("#user-input-cadastro").keyup(function () {
  validFormCadastro();

  var user = $(this).val();
  var usuarioSave = JSON.parse(localStorage.getItem("usuarios"));

  if (user === "" || user.length < 5) {
    $("#ValidUser").show();
    $("#ValidUserBase").hide();
    hasErrorUser = true;
  } else if (usuarioSave !== null && usuarioSave.usuarios[user]) {
    $("#ValidUserBase").show();
    $("#ValidUser").hide();
    hasErrorUser = true;
  } else {
    $("#ValidUser").hide();
    $("#ValidUserBase").hide()
    hasErrorUser = false;
  }
});

$("#password-input-cadastro")
  .keyup(function (e) {
    validFormCadastro();

    var pswd = $(this).val();
    console.log(hasError);

    $("#validNumberDot").hide();
    $("#ValidLetraMaiDot").hide();
    $("#ValidLetraDot").hide();
    $("#validCaractDot").hide();
    $("#validEspecialDot").hide();

    // valid length
    if (pswd.length < 8) {
      $("#validCaract").css("color", "red");
      hasErrorPassLength = true;
      $("#validCaractError").show();
      $("#validCaractSuccess").hide();
    } else {
      $("#validCaractError").hide();
      $("#validCaractSuccess").show();
      $("#validCaract").css("color", "green");
      hasErrorPassLength = false;
    }
    // valid letras
    if (pswd.match(/[A-z]/)) {
      $("#ValidLetra").css("color", "green");
      hasErrorPassLetra = false;
      $("#ValidLetraError").show();
      $("#ValidLetraSuccess").hide();
    } else {
      $("#ValidLetraError").hide();
      $("#ValidLetraSuccess").show();
      $("#ValidLetra").css("color", "red");
      hasErrorPassLetra = true;
    }
    // valid maiúsculas
    if (pswd.match(/[A-Z]/)) {
      $("#ValidLetraMai").css("color", "green");
      hasErrorPassMais = false;
      $("#ValidLetraMaiError").show();
      $("#ValidLetraMaiSuccess").hide();
    } else {
      $("#ValidLetraMaiError").hide();
      $("#ValidLetraMaiSuccess").show();
      $("#ValidLetraMai").css("color", "red");
      hasErrorPassMais = true;
    }
    // valid números
    if (pswd.match(/[0-9]/)) {
      $("#validNumber").css("color", "green");
      hasErrorPassNumber = false;
      $("#validNumberError").show();
      $("#validNumberSuccess").hide();
    } else {
      $("#validNumberError").hide();
      $("#validNumberSuccess").show();
      $("#validNumber").css("color", "red");
      hasErrorPassNumber = true;
    }
    // valid caracteres especiasi
    if (pswd.match(/([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/)) {
      $("#validEspecial").css("color", "green");
      hasErrorPassCharEspecial = false;
      $("#validEspecialError").show();
      $("#validEspecialSuccess").hide();
    } else {
      $("#validEspecialError").hide();
      $("#validEspecialSuccess").show();
      $("#validEspecial").css("color", "red");
      hasErrorPassCharEspecial = true;
    }

    if (
      !hasErrorPassLength &&
      !hasErrorPassLetra &&
      !hasErrorPassMais &&
      !hasErrorPassNumber &&
      !hasErrorPassCharEspecial
    ) {
      $("#password-confirm-input-cadastro").prop("disabled", false);
    } else {
      $("#password-confirm-input-cadastro").prop("disabled", true);
    }
  })
  .keypress(function (e) {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  })
  .focus(function () {
    $(".valid-password-container").show();
  })
  .blur(function () {
    if (
      !hasErrorPassLength &&
      !hasErrorPassLetra &&
      !hasErrorPassMais &&
      !hasErrorPassNumber &&
      !hasErrorPassCharEspecial
    ) {
      $(".valid-password-container").hide();
      $("#password-confirm-input-cadastro").prop("disabled", false);
    } else {
      $("#password-confirm-input-cadastro").prop("disabled", true);
    }
  });

$("#password-confirm-input-cadastro").keyup(function () {
  validFormCadastro();
  var pswdConfirm = $(this).val();
  var pswd = $("#password-input-cadastro").val();

  if (pswd !== pswdConfirm) {
    $("#ValidPasswordConfirm").show();
    hasErrorPassConfirm = true;
  } else {
    $("#ValidPasswordConfirm").hide();
    hasErrorPassConfirm = false;
  }
});

function validFormCadastro() {
  if (
    !hasErrorName &&
    !hasErrorEmail &&
    !hasErrorUser &&
    !hasErrorPassLength &&
    !hasErrorPassLetra &&
    !hasErrorPassMais &&
    !hasErrorPassNumber &&
    !hasErrorPassCharEspecial &&
    !hasErrorPassConfirm
  ) {
    hasError = false;
    $("#button-submit-cadastro").prop("disabled", false);
  } else {
    $("#button-submit-cadastro").prop("disabled", true);
  }
}

function createNewAccount() {
  var name = $("#name-input-cadastro").val();
  var email = $("#email-input-cadastro").val();
  var user = $("#user-input-cadastro").val();
  var password = $("#password-input-cadastro").val();
  var usuarioSave = JSON.parse(localStorage.getItem("usuarios"));

  name = titleCase(name);

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
    window.location.replace("../");
  }, "3000");
}

$("#button-submit-cadastro").on("click", function (e) {
  e.preventDefault();
  createNewAccount();
});

function login() {
  var userInput = $("#user-input-login").val();
  var passwordInput = $("#password-input-login").val();
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

$("#button-submit-login").on("click", function (e) {
  e.preventDefault();
  createNewAccount();
});

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

$("#button-cancel-cadastro").on("click", function () {
  window.location.replace("../");
});
