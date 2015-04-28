app.modules.login = {
    module: "Login",
    name: "Login",
    type: "page",
    description: "This is our page to login",
    elements: {},
    events: {
        start: function () {
            var elements = app.modules.login.elements;
            var events = app.modules.login.events;
            app.loadView('login', 'page');
            app.bind(elements, events, 'generalContainer');
            app.localization.render(app.modules.login.resources, elements);
        },
        lnkLocalization: {
            click: function (e) {
                e.preventDefault();
                var setLanguage = app.localization.get() == "en-US" ? "es-MX" : "en-US";
                app.localization.set(setLanguage, app.modules.login.resources, app.modules.login.elements);
            }
        },
        buttonComand: {
            click: function () {
                app.modules.login.code.actionX();
            }
        }
    },
    code: {
        actionX: function () {
            var el = app.modules.login.elements;
            if (el.textUser.val() == "admin" && el.textPass.val() == "123") {
                window.location.href = '#/index';
            } else {
            el.message.html("Fail to login");
        }}
    },
    resources: {
        header: {
            "en-US": "Home",
            "es-MX": "Inicio"
        },
        lnkLocalization: {
            "en-US": "Change to: Español (es-MX)",
            "es-MX": "Cambiar a: English (en-US)"
        },
        lblUser: {
            "en-US": "User",
            "es-MX": "Usuario"
        },
        lblPass: {
            "en-US": "Password",
            "es-MX": "Contraseña"
        },
        buttonComand: {
            "en-US": "Login",
            "es-MX": "Iniciar Sesion"
        }
    }
}