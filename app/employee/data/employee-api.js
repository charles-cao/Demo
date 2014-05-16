define(["plugins/http"], function(http) {
    var employees = {
        get: function() {
            if (localStorage.getItem('employees') == null) {
                var employees = [{
                    id: 1,
                    name: '张三',
                    age: 21
                }, {
                    id: 2,
                    name: '李四',
                    age: 23
                }, {
                    id: 3,
                    name: '王五',
                    age: 25
                }, {
                    id: 4,
                    name: '周六',
                    age: 26
                }];
                localStorage.employees = JSON.stringify(employees);
                localStorage.maxid = 4;
            };
            return JSON.parse(localStorage.getItem('employees'));
        },
        set: function(employees) {
            localStorage.employees = JSON.stringify(employees);
        },
        maxid: function(id) {
            if (id == null) {
                if (localStorage.getItem('maxid') == null) {
                    localStorage.maxid = 4;
                }
                return parseInt(localStorage.maxid);
            };
            localStorage.maxid = id;
            return parseInt(localStorage.maxid);
        }
    }

    return {
        list: function() {
            return employees.get();
        },
        get: function(id) {
            var list = employees.get();
            return $.grep(list, function(e) {
                return e.id == id;
            })[0];
        },
        add: function(employee) {
            var list = employees.get();
            employee.id = employees.maxid() + 1;
            list.push(employee);
            employees.set(list);
            employees.maxid(employee.id);
            return employee;
        },
        remove: function(id) {
            var list = employees.get();
            var pos = list.map(function(e) {
                return e.id;
            }).indexOf(id);
            var employee = list[pos];
            list.splice(pos, 1);
            employees.set(list);
            return employee;
        },
        update: function(employee) {
            var list = employees.get();
            var pos = list.map(function(e) {
                return e.id;
            }).indexOf(employee.id);
            list[pos] = employee;
            employees.set(list);
            return employee;
        },
        search: function(employee) {
            var newlist = [];
            var list = employees.get();
            for (i in list) {
                if (employee.id != "" && parseInt(employee.id) && list[i].id != parseInt(employee.id))
                    continue;
                if (employee.name != "" && employee.name != null && list[i].name != employee.name)
                    continue;
                if (employee.age != "" && parseInt(employee.age) && list[i].age != parseInt(employee.age))
                    continue;
                newlist.push(list[i]);
            };
            return newlist;
        }
    }
});
