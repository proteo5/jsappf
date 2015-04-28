app.modules.index_dashboard = {
    module: "index_dashboard",
    name: "Dashboard",
    type: "module",
    description: "This is our Dashboard",
    model: {},
    code: {
        start: function () {
            console.log("Dashboard loaded");
            var model = app.modules.index_dashboard.model;
            app.loadView('index/dashboard');
            //app.bind(model, 'page-login');

            $('.preloader').hide();
        },
    },
    resources: {
    }
}