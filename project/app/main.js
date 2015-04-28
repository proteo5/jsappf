app.name = "Concept JSappf";
app.title = "Concept JSappf";
app.description = "This is a Concept application for Javascript Application Framework";
app.author = "Alfredo Pinto Molina";
app.settings.defaultLocalization = "es-MX";
app.settings.supportedLocalization = ["es", "en", "en-US", "es-MX"]
app.modules.main = {
    type: "main",
    events: {
        start: function () {
            var title = app.render("{{title}} - {{version}}", app);
            $('title').text(title);
        }
    },
    code:{}
};