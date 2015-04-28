// JavaScript Application Framework (jsappf) v0.7.0 beta, http://jsappf.org/
//
// <copyright file="JSappf.js" company="Alfredo Pinto Molina">
//      Copyright (c) 2015 All Right Reserved
//      License: BSD 3 Clause (http://opensource.org/licenses/BSD-3-Clause)
// </copyright>
// <author>Alfredo Pinto Molina</author>
// <email></email>
// <date>2015-03-27</date>
// <summary></summary>
var app = {
    settings: {
        version: '',
        appPath: 'app',
        modulesPath: "modules", //default directory will be 'app'
        templateRender: Mustache, //Default template render http://mustache.github.io/
        bodyTag: "main-body",
        moduleTag: 'ajax-content',
        doCache: true
    },
    modules: {},
    currentPage: "",
    //Method to render templates
    render: function (template, data) {
        return app.settings.templateRender.render(template, data);
    },
    start: function (settings) {
        //set Seetings
        if ($.trim(settings.bodyTag).length != 0) {
            app.settings.bodyTag = settings.bodyTag;
        }

        if ($.trim(settings.moduleTag).length != 0) {
            app.settings.moduleTag = settings.moduleTag;
        }

        if ($.trim(settings.doCache).length != 0) {
            app.settings.doCache = settings.doCache;
        }

        if ($.trim(settings.version).length != 0) {
            app.version = settings.version;
        }

        //Register Routes
        Path.root("#/index");
        Path.map("#/:param1(/:param2)").to(function () {
            var sec = app.security;
            var param1 = this.params["param1"] || "";
            var param2 = this.params["param2"] || "";
            var module = param1 + (param2 == "" ? '' : '_' + param2);
            console.log("call module ", module);
            app.loadModule(module);
        });
        Path.map("#/").to(function () {
            app.loadModule("index");
        });

        // Start Main
        app.loadModule("main");

        //Initiate localization
        app.localization.init();

        //start routing.
        Path.listen();
    },
    localization: {
        init: function () {
            var localization = locache.get(app.version + "-localization");
            if (localization == null) {
                var browserLocalization = window.navigator.userLanguage || window.navigator.language;
                localization = $.inArray(browserLocalization, app.settings.supportedLocalization) == -1 ? app.settings.defaultLocalization : browserLocalization;
                app.localization.set(localization);
            }
            return localization;
        },
        get: function () {
            var localization = locache.get(app.version + "-localization");
            if (localization == null) {
                localization = app.localization.init();
            }
            return localization;
        },
        set: function (localization, resource, model) {
            if ($.inArray(localization, app.settings.supportedLocalization) == -1) {
                return false;
            }
            else {
                locache.set(app.version + "-localization", localization);
                if (resource != undefined && model != undefined) {
                    app.localization.render(resource, model);
                }

                return true;
            }
        },
        render: function (resource, model) {
            var localization = locache.get(app.version + "-localization");
            $.each(model, function (i, item) {
                if (resource[i] != undefined && resource[i][localization] != undefined) {
                    item.html(resource[i][localization]);
                }
            });
        }
    },
    loadView: function (view, loadType) {
        var result = null;
        var isMainView = loadType == 'page';
        if (app.settings.doCache) {
            result = locache.get(app.version + "-v-" + data.view.viewName);
        }
        if (result == null) {
            var path = app.settings.appPath + "/" + (isMainView ? "" : app.settings.modulesPath + "/");
            result = app.loadFile(path, view + ".html");
            if (app.settings.doCache) {
                locache.set(app.version + "-v-" + data.view.viewName, result, 3600);
            }
        }
        var place = isMainView ? app.settings.bodyTag : app.settings.moduleTag;
        document.getElementById(place).innerHTML = result;
    },
    bind: function (model, events, place) {
        $('#' + place + ' *').each(function () {
            var ID = $(this).attr('id');
            if (ID != undefined) {
                model[ID] = $(this);
                if (events[ID] != undefined) {
                    for (var item in events[ID]) {
                        try {
                            app.executeFunctionByName(item.toString(), model[ID], events[ID][item.toString()]);
                        }
                        catch (err) {
                            console.log("The method " + item.toString() + " on " + ID + " was not found to bind event.");
                        }
                    }
                }
                else {
                    console.log("The control " + ID + " was not found to bind events. (Check word case)");
                }
            }
        });
    },
    loadModule: function (module) {
        //verify that the module is not allready loaded
        var result = null;
        if (!app.modules.hasOwnProperty(module)) {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            if (result == null) {
                var path = app.settings.appPath + "/" + (module == 'main' || module == "login" || module == "index" ? "" : app.settings.modulesPath + "/");
                result = app.loadFile(path, module + ".js");
            }
            var t = document.createTextNode(result);
            fileref.appendChild(t);
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        }
        var moduleType = app.modules[module].type;
        switch (moduleType) {
            case "control":
                if (app.currentPage != "index") {

                    app.loadModule("index");
                }
                break;
            case "page":
                app.currentPage = module;
                break;
            default: break;
        };

        app.executeFunctionByName(module + ".events.start", app.modules);
    },
    loadFile: function (path, filename) {
        actualFilename = filename.replace("_", "/");
        var file = '';
        var url = app.render("{{{path}}}{{{filename}}}", { filename: actualFilename, path: path })
        var result = $.ajax({
            type: "GET",
            url: url,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            file = result.responseText;
        }
        return file;
    },
    getData: function (url) {
        var response = {};
        var result = $.ajax({
            type: "GET",
            url: url,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            response = result.responseJSON;
        }
        return response;
    },
    postData: function (url, data) {
        var response = {};
        var result = $.ajax({
            type: "POST",
            url: url,
            data: data,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            response = result.responseJSON;
        }
        return response;
    },
    executeFunctionByName: function (functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    },
}