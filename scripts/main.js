function Tax() {
    'use strict';
    var self = this;

    self.inn = ko.observable().extend({innValidator: true});

    self.adress = ko.observable();
    self.area = ko.observable();

    self.sum = ko.observable();
    self.period = ko.observable();
    self.date = ko.observable();
}

ko.components.register('tax', {
    viewModel: Tax,
    template: { element: 'tax-template' }
});


function App() {
    'use strict';
    var self = this;

    self.taxes = ko.observableArray();
    self.currentTax = ko.observable();
}

App.prototype.isCurrentTax = function(tax) {
    return this.currentTax() === tax;
};

App.prototype.addTax = function() {
    this.taxes.push(new Tax());
};


var init = function() {
    'use strict';

    var app = new App();
    window.app = app;
    var tax = new Tax();
    app.taxes.push(tax);
    app.currentTax(tax);
    ko.applyBindings(app);
};


if (document.readyState !== 'loading') {
    init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init);
} else {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState !== 'loading') {
            init();
        }
    });
}
