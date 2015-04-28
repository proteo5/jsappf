app.modules.index = {
    module: "index",
    name: "Home Page",
    type: "page",
    description: "This is our default page",
    elements: {},
    events: {
        start: function(){
            var elements = app.modules.index.elements;
            var events = app.modules.index.events;
            app.loadView('index', 'page');
            app.bind(elements, events, 'generalContainer');
            app.localization.render(app.modules.index.resources, elements);
        },
        lnkLocalization: {
            click: function (e) {
                e.preventDefault();
                var setLanguage = app.localization.get() == "en-US" ? "es-MX" : "en-US";
                app.localization.set(setLanguage, app.modules.index.resources, app.modules.index.elements);
            }
        }
    },
    code: {
       
    },
    resources: {
        header:{
            "en-US": "Home",
            "es-MX": "Inicio"
        },
        lnkLocalization: {
            "en-US": "Español (es-MX)",
            "es-MX": "English (en-US)"
        }
    }
}