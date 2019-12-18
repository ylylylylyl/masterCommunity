export function isObject (value) {
  // eslint-disable-next-line eqeqeq
  return typeof (value) === 'object' && Object.prototype.toString.call(value).toLowerCase() == '[object object]' && !value.length
}

export function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]' && value.length
}

export function isNumber (value) {
  return Object.prototype.toString.call(value) === '[object Number]' && !isNaN(value)
}

export function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]' && value !== ''
}
