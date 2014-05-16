define(['durandal/app','employee/data/employee-api'],function(app,employeeApi) {
    return {
        employee:ko.observable(),
        activate: function (id) {
            var self = this;
            self.employee(employeeApi.get(id));
        }
    }
});