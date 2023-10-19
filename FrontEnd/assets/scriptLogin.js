const formLogin = document.getElementById("formLogin");
const buttonSubmit = formLogin.querySelector("[type=submit]"); // Sert pour desactiver le bouton pendant le temps d'attendre la reponse d'API
const messageErrorLogin = document.querySelector(".errorLogin"); // Sert pour afficher la message d'erreur de login

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();
    buttonSubmit.setAttribute("disabled", "");

    const emailValue = event.target.querySelector("#email").value.toLowerCase();
    const passwordValue = event.target.querySelector("#password").value;

    if (validateInputs(emailValue, passwordValue)) {
        try {
            const login = {
                email: emailValue,
                password: passwordValue
            }

            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login)
            });

            if (response.ok) {
                const res = await response.json();
                window.localStorage.setItem("login", JSON.stringify(res));
                location.href = "../index.html" 
            }
            else {
                switch (response.status) {
                    case 404:
                        messageErrorLogin.innerText = "L'e-mail entré ne correspond à aucun compte.";
                        break;
                    case 401:
                        messageErrorLogin.innerText = "Le mot de passe entré est incorrect.";
                        break;
                    default:
                        messageErrorLogin.innerText = "Erreur rencontré, aucun 'case' correspondant dans 'switch'."
                }
                messageErrorLogin.style = "display:block"
            }

        } catch (error) {
            const messageErrorLogin = document.querySelector(".errorLogin");
            messageErrorLogin.innerText = "Nous avons rencontré un problème, veuillez réessayer ultérieurement.";
            messageErrorLogin.style = "display:block";
        }
    }
    buttonSubmit.removeAttribute("disabled");
})


// Fonction: Validation des inputs (e-mail et mot de passe)
function validateInputs(email, password) {
    const RegExpEmail = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+[\.]+[a-z0-9._-]+$");
    const RegExpPassword = new RegExp("^[A-Za-z0-9#?!@$%^&*-]+$");

    if (email === "") {
        messageErrorLogin.innerText = "Veuillez saisir votre adresse e-mail.";
    } else if (!email.match(RegExpEmail)) {
        messageErrorLogin.innerText = "L'e-mail entré n'est pas vailde.";
    } else if (password === "") {
        messageErrorLogin.innerText = "Veuillez saisir votre mot de passe.";
    } else if (!password.match(RegExpPassword)) {
        messageErrorLogin.innerText = "Le mot de passe n'est pas valide.";
    } else {
        return true;
    }
    messageErrorLogin.style = "display:block";
}


