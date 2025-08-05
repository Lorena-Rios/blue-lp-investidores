
try {
  AOS.init();
} catch (error) {
  
}
function mascara(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("execmascara()", 1);
}
function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}
function mtel(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v;
}
function id(el) {
  return document.getElementById(el);
}
window.onload = function () {
  document.querySelectorAll(".telefone").forEach((tel) => {
    tel.addEventListener("keyup", function () {
      mascara(this, mtel);
    });
  });
};


document.querySelectorAll(".form-cadastro").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    formData.set("empreendimento", "Blue GraÃ§a");

    formData.set("communications", true);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var utm_source = "direct";
    var utm_medium = "direct";
    var utm_campaign = "direct";

    if (urlParams) {
      if (urlParams.get("utm_source")) {
        utm_source = urlParams.get("utm_source");
      }
      if (urlParams.get("utm_medium")) {
        utm_medium = urlParams.get("utm_medium");
      }
      if (urlParams.get("utm_campaign")) {
        utm_campaign = urlParams.get("utm_campaign");
      }
    }

    utm_source = utm_source + (this.getAttribute("data-zap") ? "_zap" : "");

    formData.set("origem", utm_source);
    formData.set("campanha", utm_campaign);
    formData.set("meio", utm_medium);

    fetch("https://acheiinterativa.com.br/portal/cadastro/blue-graca.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((res) => {
        console.log(res);
        if (
          formData.get("interesse").toUpperCase() == "BAIXAR BOOK" ||
          formData.get("interesse").toUpperCase().includes("BOOK")
        ) {
          window.location.href = `./agradecimento/${queryString}${
            queryString ? "&book=sim" : "?book=sim"
          }`;
        } else if (
          formData.get("interesse").toUpperCase() == "BAIXE A PLANTA"
        ) {
          window.location.href = `./agradecimento/${queryString}${
            queryString ? "&book=sim" : "?planta=sim"
          }`;
        } else {
          window.location.href = `./agradecimento/${queryString}`;
        }
      });
  });
});
