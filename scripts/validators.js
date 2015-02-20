ko.extenders.innValidator = function(target, precision) {
    var result = ko.pureComputed({
        read: target,
        write: function(value) {
            var errorMessage = null;
            var current = target();
            if (value && value.length !== 11) {
                errorMessage = 'ИНН должен быть длиной 11 символов'
            }
            var intValue = parseInt(value);
            result.errorMessage = errorMessage;
            target(value);
        }
    }).extend({ notify: 'always' });
    result(target());
    return result;
};


ko.bindingHandlers.validationMessage = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        ko.unwrap(valueAccessor());
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var valueObservable = valueAccessor();
        ko.unwrap(valueObservable);  // подписываемся на изменения
        if (valueObservable) {
            element.innerHTML = valueObservable.errorMessage;
        }
    }
};