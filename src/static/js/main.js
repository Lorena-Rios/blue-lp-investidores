
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

    let textForm = form.querySelector(".text-form");
    if (textForm) {
      form.querySelector(".text-form").classList.add("hidden");
    }

    let loadForm = form.querySelector(".load-form");
    if (loadForm) {
      form.querySelector(".load-form").classList.remove("hidden");
    }

    var formData = new FormData(this);
    var jsonData = Object.fromEntries(formData.entries());

    if (!jsonData["email"]) {
      var telefoneNumerico = jsonData["telefone"].replace(/\D/g, "");
      jsonData["email"] = `${telefoneNumerico}@sememail.com`;
    }

    jsonData["empreendimento"] = "Blue Graça";
    jsonData["communications"] = true;

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    var isZap = !!this.getAttribute("data-zap");

    jsonData["origem"] = urlParams.get("utm_source") || "direct";
    jsonData["meio"] = urlParams.get("utm_medium") || "direct";
    jsonData["campanha"] = urlParams.get("utm_campaign") || "direct";
    jsonData["origem"] += this.getAttribute("data-zap") ? "_zap" : "";

    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisiÃ§Ã£o: ${response.statusText}`);
        }
        return response.text();
      })
      .then((res) => {
        if (textForm) {
          form.querySelector(".text-form").classList.remove("hidden");
        }

        if (loadForm) {
          form.querySelector(".load-form").classList.add("hidden");
        }

        if (isZap) {
          let dataJson = "";

          try {
            dataJson = JSON.parse(res);

            if (dataJson && dataJson.wpp_link) {
              window.location.href = `${dataJson.wpp_link}`;
            }
          } catch (error) {
            window.location.href = `./agradecimento`;
          }
        } else {
          if (
            jsonData["interesse"].toUpperCase() === "BAIXAR BOOK" ||
            jsonData["interesse"].toUpperCase().includes("BOOK")
          ) {
            window.location.href = `./agradecimento/${queryString}${
              queryString ? "&book=sim" : "?book=sim"
            }`;
          } else if (jsonData["interesse"].toUpperCase() === "BAIXE A PLANTA") {
            window.location.href = `./agradecimento/${queryString}${
              queryString ? "&book=sim" : "?planta=sim"
            }`;
          } else {
            window.location.href = `./agradecimento/${queryString}`;
          }
        }
      })
      .catch((error) => {
        alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
        console.log(error);

        if (textForm) {
          form.querySelector(".text-form").classList.remove("hidden");
        }

        if (loadForm) {
          form.querySelector(".load-form").classList.add("hidden");
        }
      });
  });
});

function returnHome() {
  let a = document.querySelector("#return-site");

  if (a) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if (urlParams.has("book")) {
      urlParams.delete("book");

      var newQueryString = urlParams.toString();
      var updatedQueryString = newQueryString ? `?${newQueryString}` : "";
      var updatedUrlParams = new URLSearchParams(newQueryString);

      queryString = updatedQueryString;
      urlParams = updatedUrlParams;
    }
    a.href = `../${queryString}`;
  }
}
returnHome();
