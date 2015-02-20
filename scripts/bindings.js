ko.bindingHandlers.kladr = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        console.log(element);
        $(element).kladr({oneString: true, type: $.kladr.type.city});
    },
    update: function (element, valueAccessor) {
    }
};