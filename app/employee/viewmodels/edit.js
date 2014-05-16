define(['employee/data/employee-api', 'plugins/dialog'], function (employeeApi, dialog) {
    return {
        employee: ko.observable(),
        activate: function (item) {
            this.employee(item);
        },
        close: function () {
            dialog.close(this);
        },
        save: function () {
            var self = this;
            employeeApi.update(self.employee());
            return dialog.close(self, self.employee());
        }
    }
});