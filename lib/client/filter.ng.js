app
    // CRM
    .filter('task', function($meteor) {
        return function(input) {
            if (input) {
                var task = $meteor.object(Tasks, input, false);
                return task.title;
            } else {
                return '';
            }
        };
    })
    .filter('case', function($meteor) {
        return function(input) {
            if (input) {
                var cas = $meteor.object(Cases, input, false);
                return cas.title;
            } else {
                return '';
            }
        };
    })
    .filter('company', function($meteor) {
        return function(input) {
            if (input) {
                var company = $meteor.object(Companies, input, false);
                return company.company;
            } else {
                return '';
            }
        };
    })
    .filter('contact', function($meteor) {
        return function(input) {
            if (input) {
                var contact = $meteor.object(Contacts, input, false);
                return contact.fullName;
            } else {
                return '';
            }
        };
    })
    .filter('deal', function($meteor) {
        return function(input) {
            if (input) {
                var deal = $meteor.object(Deals, input, false);
                return deal.title;
            } else {
                return '';
            }
        };
    })
    .filter('user', function($meteor) {
        return function(input) {
            if (input) {
                var user = $meteor.object(Meteor.users, input, false);
                return user.profile.fullName;
            } else {
                return '';
            }
        };
    })
    .filter('username', function($meteor) {
        return function(input) {
            if (input) {
                var user = $meteor.object(Meteor.users, input, false);
                return user.username;
            } else {
                return '';
            }
        };
    })
    .filter('category', function($meteor) {
        return function(input) {
            if (input) {
                var category = $meteor.object(Categories, input, false);
                return category.name;
            } else {
                return '';
            }
        };
    })
    .filter('status', function($meteor) {
        return function(input) {
            if (input) {
                var status = $meteor.object(Statuses, input, false);
                return status.name;
            } else {
                return '';
            }
        };
    })
    .filter('source', function($meteor) {
        return function(input) {
            if (input) {
                var source = $meteor.object(Sources, input, false);
                return source.name;
            } else {
                return '';
            }
        };
    })
    .filter('country', function($meteor) {
        return function(input) {
            if (input) {
                var country = $meteor.object(Countries, input, false);
                return country.name;
            } else {
                return '';
            }
        };
    })
    .filter('product', function($meteor) {
        return function(input) {
            if (input) {
                var product = $meteor.object(Products, input, false);
                return product.name;
            } else {
                return '';
            }
        };
    })
    .filter('salePath', function($meteor) {
        return function(input) {
            if (input) {
                var salePath = $meteor.object(SalePaths, input, false);
                return salePath.name;
            } else {
                return '';
            }
        };
    })
    // SRM
    .filter('stockType', function($meteor) {
        return function(input) {
            if (input) {
                var stockType = $meteor.object(StockTypes, input, false);
                return stockType.name;
            } else {
                return '';
            }
        };
    });