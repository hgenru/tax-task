ko.extenders.numeric = function(target, precision) {
    var result = ko.pureComputed({
        read: target,
        write: function(newValue) {
            newValue = newValue || '';
            newValue = newValue.replace(',', '.');
            newValue = newValue.replace(/[^\d.]/g, '');
            var current = target();
            var roundingMultiplier = Math.pow(10, precision);
            var newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue);
            var valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
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

ko.validation.rules['innLength'] = {
    validator: function (val) {
        var numVal = val.replace(/[^\d.]/g, '');
        return numVal.length === 12 || numVal.length === 10;
    },
    message: 'ИНН должен быть длиной в 10 или 12 символов.'
};

ko.validation.rules['innChecksum'] = {
    validator: function(val) {
        var inputNumber = val.replace(/[^\d.]/g, '');
        if ((inputNumber.length == 10) &&
            (inputNumber[9] ==
                ((2 * inputNumber[0] + 4 * inputNumber[1] + 10 *
                    inputNumber[2] + 3 * inputNumber[3] + 5 *
                    inputNumber[4] + 9 * inputNumber[5] + 4 *
                    inputNumber[6] + 6 * inputNumber[7] + 8 *
                    inputNumber[8]) % 11) % 10)) {
            return true;
        } else if ((inputNumber.length == 12) &&
            ((inputNumber[10] == ((7 * inputNumber[0] + 2 *
                    inputNumber[1] + 4 * inputNumber[2] + 10 *
                    inputNumber[3] + 3 * inputNumber[4] + 5 *
                    inputNumber[5] + 9 * inputNumber[6] + 4 *
                    inputNumber[7] + 6 * inputNumber[8] + 8 *
                    inputNumber[9]) % 11) % 10) &&
                (inputNumber[11] == ((3 * inputNumber[0] + 7 *
                    inputNumber[1] + 2 * inputNumber[2] + 4 *
                    inputNumber[3] + 10 * inputNumber[4] + 3 *
                    inputNumber[5] + 5 * inputNumber[6] + 9 *
                    inputNumber[7] + 4 * inputNumber[8] + 6 *
                    inputNumber[9] + 8 * inputNumber[10]) % 11) % 10))) {
            return true;
        } else {
            return false;
        }
    },
    message: 'Ввёден невалидный ИНН.'
};

ko.validation.rules['numericPositiveAndNotZero'] = {
    validator: function (val) {
        // Современные браузеры нам и так число вернут, но мы подстрахуемся
        var numVal = val.toString().replace(/[^\d.]/g, '');
        return numVal > 0;
    },
    message: 'Число в этом поле должно быть больше нуля.'
};