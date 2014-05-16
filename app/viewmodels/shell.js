define(['plugins/router', 'durandal/app'], function (router, app) {
    var isAjaxing = ko.observable(false);
    $(document).ajaxStart(function () { isAjaxing(true); })
    .ajaxStop(function () { isAjaxing(false); });

    return {
        router: router,
        isLoading: ko.computed(function () {
            return (router.isNavigating() || isAjaxing());
        }),
        activate: function () {
            router.map([
                { route: '', title: '首页', moduleId: 'viewmodels/welcome', nav: true, icon:'glyphicon glyphicon-home'},
                { route: 'list',title:'员工列表', moduleId: 'employee/viewmodels/list', nav: true, icon:'glyphicon glyphicon-user' },
                { route: 'add',title:'新增员工', moduleId: 'employee/viewmodels/add', nav: true, icon:'glyphicon glyphicon-plus' },
                { route: 'detail/:id',title:'员工信息', moduleId: 'employee/viewmodels/detail', nav: false, icon:'glyphicon glyphicon-home' }
                ]).buildNavigationModel();

            return router.activate();
        }
    };
});