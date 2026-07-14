/**
 * Form field validators.
 * Each validator returns `null` on success or an error string on failure.
 */

/**
 * Required field.
 * @param {*} value
 * @returns {string|null}
 */
export const required = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ''
    ? null
    : 'This field is required.';

/**
 * Minimum string length.
 * @param {number} min
 */
export const minLength = (min) => (value) =>
  !value || String(value).length >= min
    ? null
    : `Must be at least ${min} characters.`;

/**
 * Maximum string length.
 * @param {number} max
 */
export const maxLength = (max) => (value) =>
  !value || String(value).length <= max
    ? null
    : `Must be at most ${max} characters.`;

/**
 * Valid email address.
 * @param {string} value
 * @returns {string|null}
 */
export const email = (value) =>
  !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
    ? null
    : 'Please enter a valid email address.';

/**
 * Valid URL.
 * @param {string} value
 * @returns {string|null}
 */
export const url = (value) => {
  if (!value) return null;
  try { new URL(value); return null; }
  catch { return 'Please enter a valid URL.'; }
};

/**
 * Numeric value.
 * @param {*} value
 * @returns {string|null}
 */
export const numeric = (value) =>
  !value || !isNaN(Number(value))
    ? null
    : 'Must be a valid number.';

/**
 * Minimum numeric value.
 * @param {number} min
 */
export const minValue = (min) => (value) =>
  !value || Number(value) >= min
    ? null
    : `Must be at least ${min}.`;

/**
 * Maximum numeric value.
 * @param {number} max
 */
export const maxValue = (max) => (value) =>
  !value || Number(value) <= max
    ? null
    : `Must be at most ${max}.`;

/**
 * Strong password: min 8 chars, one uppercase, one digit.
 * @param {string} value
 * @returns {string|null}
 */
export const strongPassword = (value) => {
  if (!value) return null;
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter.';
  if (!/\d/.test(value))    return 'Password must contain at least one digit.';
  return null;
};

/**
 * Match two fields (e.g. password confirmation).
 * @param {string} otherValue  The value to match against.
 * @param {string} [label]     Label for the other field (for error messages).
 */
export const match = (otherValue, label = 'values') => (value) =>
  value === otherValue ? null : `The ${label} do not match.`;

/**
 * Allowed file types.
 * @param {string[]} types  Array of MIME types, e.g. ['image/jpeg','image/png']
 */
export const fileType = (types) => (file) => {
  if (!file) return null;
  return types.includes(file.type)
    ? null
    : `Allowed types: ${types.join(', ')}.`;
};

/**
 * Maximum file size.
 * @param {number} maxBytes
 */
export const fileSize = (maxBytes) => (file) => {
  if (!file) return null;
  const mb = (maxBytes / (1024 * 1024)).toFixed(0);
  return file.size <= maxBytes ? null : `File must be smaller than ${mb} MB.`;
};

/**
 * Run an array of validators against a value; return the first error or null.
 * @param {*} value
 * @param {Function[]} validators
 * @returns {string|null}
 */
export const runValidators = (value, validators = []) => {
  for (const v of validators) {
    const error = v(value);
    if (error) return error;
  }
  return null;
};

/**
 * Validate an entire form object.
 * @param {object} values  { fieldName: value }
 * @param {object} rules   { fieldName: [validator, ...] }
 * @returns {{ errors: object, isValid: boolean }}
 */
export const validateForm = (values, rules) => {
  const errors = {};
  for (const [field, validators] of Object.entries(rules)) {
    const error = runValidators(values[field], validators);
    if (error) errors[field] = error;
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
};
