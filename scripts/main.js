function Tax() {
    'use strict';
    var self = this;

    self.inn = ko.observable('').extend({ innLength: true, required: true, innChecksum: true });

    self.adress = ko.observable().extend({ required: true });
    self.area = ko.observable().extend({ numeric: 2, numericPositiveAndNotZero: true, required: true });

    self.sum = ko.observable().extend({ numeric: 2, numericPositiveAndNotZero: true, required: true });
    self.periodYear = ko.observable().extend({ required: true });
    self.periodQuarter = ko.observable().extend({ required: true });
    self.date = ko.observable().extend({ required: true });

    self.errors = ko.validation.group(self, { deep: true });
    self.errors.subscribe(function(errors) {
        self.isValid(errors.length === 0);
    });

    self.isValid = ko.observable(true);
}

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
    var newTax = new Tax();
    this.taxes.push(newTax);
    this.currentTax(newTax);
};

App.prototype.deleteTax = function(tax) {
    console.log(tax, this.taxes);
    this.taxes.remove(tax);
    var taxes = this.taxes();
    this.currentTax(taxes[taxes.length - 1]);
};

App.prototype.checkAllErrors = function() {
    var taxes = this.taxes();
    var allTaxesIsValid = true;
    var errorTax;
    taxes.forEach(function(tax) {
        if (!tax.isValid()) {
            tax.errors.showAllMessages();
            errorTax = tax;
            allTaxesIsValid = false;
        }
    });
    if (errorTax) {
        this.currentTax(errorTax);
    }
    return allTaxesIsValid;
};

App.prototype.sendRequest = function() {
    var allTaxesIsValid = this.checkAllErrors();
    if (allTaxesIsValid) {
        var result = [];
        var taxesI;
        var taxes = this.taxes();
        for (taxesI = 0; taxesI < taxes.length; taxesI++) {
            var tax = taxes[taxesI];
            var row = [
                tax.inn().replace(/[^\d.]/g, ''),
                '"' + tax.adress() + '"',
                // WTF? Зачем запятые заменять-то?
                tax.area().toString().replace('.', ','),
                tax.sum().toString().replace('.', ','),
                tax.periodYear() + '-' + tax.periodQuarter(),
                tax.date()
            ].join(';');
            result.push(row);
        }
        result = result.join('\n');
        $.ajax({
            url: '/receive',
            method: 'POST',
            data: result,
            success: function() {
                $('#sucessModal').modal();
            },
            error: function() {
                $('#failureModal').modal();
            }
        });
    }
};


var init = function() {
    'use strict';

    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        messageTemplate: null,
        parseInputAttributes: false,
        errorElementClass: 'has-error',
        errorMessageClass: 'help-block'
    }, true);
    ko.validation.registerExtenders();
    ko.validation.locale('ru-RU');

    var app = new App();
    window.app = app;
    var tax = new Tax();
    app.taxes.push(tax);
    app.currentTax(tax);

    ko.applyBindings(app);

};


$(init);
