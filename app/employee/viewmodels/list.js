define(['employee/data/employee-api', 'durandal/app', 'plugins/router', 'toastr'], function(employeeApi, app, router, toastr) {
    var employees = ko.observableArray([]);
    return {
        displayName: "员工列表",
        employees: employees,
        id: ko.observable(),
        age: ko.observable(),
        name: ko.observable(),
        activate: function() {
            var that = this;
            var response = employeeApi.list();
            that.employees = ko.mapping.fromJS(response);
            employees = that.employees;
        },
        del: function(item) {
            app.showMessage("确定删除员工 " + item.name() + "?", "删除员工信息", ['删除', '取消']).then(function(dialogResult) {
                if (dialogResult == '删除') {
                    employeeApi.remove(item.id());
                    employees.remove(item);
                    toastr.options.closeButton = true;
                    toastr.success('删除成功！')
                }
            });
        },
        edit: function(item) {
            app.showDialog('employee/viewmodels/edit', ko.mapping.toJS(item)).then(function(response) {
                if (response) {
                    item.name(response.name);
                    item.age(response.age);
                    toastr.options.closeButton = true;
                    toastr.success('员工信息更新成功！')
                }
            });
        },
        detail: function(item) {
            router.navigate("#detail/" + item.id());
        },
        search: function() {
            var self = this;
            var t = employeeApi.search({
                id: self.id(),
                name: self.name(),
                age: self.age()
            });
            self.employees.removeAll();
            for (i in t) {
                self.employees.push(ko.mapping.fromJS(t[i]));
            };
        }
    }
});
