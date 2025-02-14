export const KiloBytes = K => K * 1000;
export const MegaBytes = M => M * 1000 * 1000;

export const Is = {
    required: (val) => (val == null || val == '') && 'Is required',
    min: (min) => (val) => val < min && 'Needs to be greater than ' + min,
    max: (max) => (val) => val > max && 'Needs to be less than ' + max,
    before: (beforeDate) => (val) => +val < +beforeDate && "Needs to be before " + val,
    after: (afterDate) => (val) => +val > +afterDate && "Needs to be after " + val,
    minLength: (minLength) => val => val.length < minLength && 'Needs to be at least ' + minLength + ' chars',
    maxLength: (maxLength) => val => val.length > maxLength && 'Can not be longer than ' + maxLength + ' chars',
    maxFileSize: (maxFileSize) => val => val.size > maxFileSize && 'Must be less than ' + maxFileSize + ' bytes.',
    minFileSize: (minFileSize) => val => val.size < minFileSize && 'Must be greater than than ' + minFileSize + ' bytes.',
    contentType: (contentType) => val => val.type?.toLowerCase() != contentType.toLowerCase() && 'Needs to be of type: ' + contentType,
    custom: (validatorFn) => (val) => validatorFn(val)
};