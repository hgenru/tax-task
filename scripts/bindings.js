ko.bindingHandlers.kladr = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).kladr({oneString: true, type: $.kladr.type.city});
    }
};

ko.bindingHandlers.formatter = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = ko.unwrap(valueAccessor());
        new Formatter(element, options);
    }
};

ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = ko.unwrap(valueAccessor());
        $(element).datepicker({
            language: 'ru',
            todayHighlight: true,
            orientation: 'bottom right',
        });
    }
};
