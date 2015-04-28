app.modules.admin_users = {
    module: "admin_users",
    name: "Users",
    type: "module",
    description: "This is our User module",
    model: {},
    code: {
        start: function () {
            console.log("Users loaded");
            var model = app.modules.admin_users.model;
            app.loadView('admin/users');
            //app.bind(model, 'page-login');

            $('.preloader').hide();
        },
    },
    resources: {
    }
}