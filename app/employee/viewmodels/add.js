define(['employee/data/employee-api', 'plugins/router', 'toastr'], function(employeeApi, router, toastr) {
    return {
        employee: ko.observable(),
        add: function() {
            employeeApi.add(this.employee());
            toastr.options.closeButton = true;
            toastr.success('新增成功！');
            router.navigate('#list');
        },
        activate: function() {
            this.employee({
                name: "",
                age: ""
            });
        }
    }
});
