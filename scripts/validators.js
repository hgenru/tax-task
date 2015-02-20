ko.extenders.innValidator = function(target, precision) {
    var result = ko.pureComputed({
        read: target,
        write: function(value) {
            var errorMessage = '';
            var intValue = parseInt(value) || 0;
            var intValueString = intValue ? intValue.toString() : '';
            // console.log('>' + value + '<|>' + intValueString + '<');
            if (value && intValueString.length !== 11) {
                errorMessage = 'ИНН должен быть числом длиной 11 символов'
            }
            result.errorMessage = errorMessage;
            target(value);
        }
    }).extend({ notify: 'always' });
    result(target());
    return result;
};

ko.extenders.numeric = function(target, precision) {
    var result = ko.pureComputed({
        read: target,
        write: function(newValue) {
            var current = target(),
                roundingMultiplier = Math.pow(10, precision),
                newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
            if (valueToWrite !== current) {
                target(valueToWrite);
            } else {
                if (newValue !== current) {
                    target.notifySubscribers(valueToWrite);
                }
            }
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