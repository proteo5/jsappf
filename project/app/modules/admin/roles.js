app.modules.admin_roles = {
    module: "admin_roles",
    name: "Roles",
    type: "module",
    description: "This is our Role module",
    model: {},
    code: {
        start: function () {
            console.log("Role loaded");
            var model = app.modules.admin_roles.model;
            app.loadView('admin/roles');
            //app.bind(model, 'page-login');

            $('.preloader').hide();
        },
    },
    resources: {
    }
}