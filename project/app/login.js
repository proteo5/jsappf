app.modules.login = {
    module: "Login",
    name: "Login",
    type: "page",
    description: "This is our page to login",
    model: {},
    events: {
        Username: {
            focusout: function () {
                var model = app.modules.login.model;
                var parentTag = $(this).parent();
                parentTag.removeClass('has-error');
                model.lblUserNotEmpty.hide();
                model.lblPasswordNotEmpty.hide();
                model.lblMesage.hide();
                console.log("focusout");
            },
            keypress: function (e) {
                if (e.which == 13) {
                    app.modules.login.model.Password.focus();
                }
            }
        },
        Password:{
            focusout: function () {
                var model = app.modules.login.model;
                var parentTag = $(this).parent();
                parentTag.removeClass('has-error');
                model.lblUserNotEmpty.hide();
                model.lblPasswordNotEmpty.hide();
                model.lblMesage.hide();
            },
            keypress: function (e) {
                if (e.which == 13) {
                    app.modules.login.code.dologin();
                }
            }
        },
        LoginButton: {
            click: function () {
                app.modules.login.code.dologin();
            }
        },
        lnkLocalization: {
            click: function (e) {
                e.preventDefault();
                var model = app.modules.login.model;
                var setLanguage = app.localization.get() == "en-US" ? "es-MX" : "en-US";
                app.localization.set(setLanguage, app.modules.login.resources, app.modules.login.model);
            }
        }
    },
    code: {
        start: function () {
            var model = app.modules.login.model;
            var events = app.modules.login.events;
            app.loadView('login');
            app.bind(model,events, 'page-login');
            app.localization.render(app.modules.login.resources,model);
        },
        dologin: function () {
            var model = app.modules.login.model;
            var validateResult = app.modules.login.code.validate();
            if (validateResult) {
                var data = { user: model.Username.val(), password: model.Password.val() };
                var result = app.postData(app.urls.login, data);
                if (result.result.Result == app.results.success) {
                    app.loadModule("index");
                } else {
                    model.lblMesage.show();
                }
            } 
        },
        validate: function () {
            var model = app.modules.login.model;
            model.fgUserName.removeClass("has-error");
            model.fgPassword.removeClass("has-error");
            model.lblUserNotEmpty.hide();
            model.lblPasswordNotEmpty.hide();
            model.lblMesage.hide();
            var valid = true;
            if (model.Username.val().trim().length <= 0) {
                valid = false;
                model.fgUserName.addClass("has-error");
                model.lblUserNotEmpty.show();
            }
            if (model.Password.val().trim().length <= 0) {
                valid = false;
                model.fgPassword.addClass("has-error");
                model.lblPasswordNotEmpty.show();
            }
            return valid;
        }
    },
    resources: {
        lnkLocalization: {
            "en-US": "Español (es-MX)",
            "es-MX": "English (en-US)"
        },
        lnkAccount: {
            "en-US": "Need an account?",
            "es-MX": "¿Necesita una cuenta?"
        },
        lblHeader: {
            "en-US": "Login Page",
            "es-MX": "Página de Login"
        },
        lblUserName: {
            "en-US": "User:",
            "es-MX": "Usuario:"
        },
        lblPassword: {
            "en-US": "Password:",
            "es-MX": "Contraseña:"
        },
        lblUserNotEmpty: {
            "en-US": "The user name is empty.",
            "es-MX": "El usuario esta vacio."
        },
        lblPasswordNotEmpty: {
            "en-US": "The Password is empty.",
            "es-MX": "La contraseña esta vacia."
        },
        lblMesage: {
            "en-US": "User or Password incorrect.",
            "es-MX": "Usuario o Contraseña incorrecta."
        },
        LoginButton: {
            "en-US": "Login",
            "es-MX": "Iniciar Sessión"
        }
    }
}