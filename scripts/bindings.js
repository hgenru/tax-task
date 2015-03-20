ko.bindingHandlers.kladr = {
    init: function (element) {
        $(element).kladr({oneString: true, type: $.kladr.type.city});
    }
};

ko.bindingHandlers.formatter = {
    init: function (element, valueAccessor) {
        var options = ko.unwrap(valueAccessor());
        new Formatter(element, options);
    }
};

ko.bindingHandlers.datepicker = {
    init: function (element) {
        $(element).datepicker({
            language: 'ru',
            todayHighlight: true,
            orientation: 'bottom right',
        });
    }
};
