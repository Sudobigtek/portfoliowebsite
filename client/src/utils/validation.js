export const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = password => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) errors.push('Include at least one uppercase letter');
  if (!hasLowerCase) errors.push('Include at least one lowercase letter');
  if (!hasNumbers) errors.push('Include at least one number');
  if (!hasSpecialChar) errors.push('Include at least one special character');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !value) {
      errors[field] = 'This field is required';
    } else if (value) {
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `Minimum ${fieldRules.minLength} characters required`;
      }
      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        errors[field] = `Maximum ${fieldRules.maxLength} characters allowed`;
      }
      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        errors[field] = fieldRules.message || 'Invalid format';
      }
      if (fieldRules.validate) {
        const customError = fieldRules.validate(value, values);
        if (customError) errors[field] = customError;
      }
    }
  });

  return errors;
};

export const validatePhone = phone => {
  const re = /^\+?[\d\s-]{10,}$/;
  return {
    isValid: re.test(phone),
    error: 'Please enter a valid phone number',
  };
};

export const validateUrl = url => {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL',
    };
  }
};

export const validateDate = (date, { minDate, maxDate } = {}) => {
  const dateObj = new Date(date);
  const errors = [];

  if (isNaN(dateObj.getTime())) {
    errors.push('Please enter a valid date');
  }

  if (minDate && dateObj < new Date(minDate)) {
    errors.push(`Date must be after ${new Date(minDate).toLocaleDateString()}`);
  }

  if (maxDate && dateObj > new Date(maxDate)) {
    errors.push(`Date must be before ${new Date(maxDate).toLocaleDateString()}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const commonRules = {
  email: {
    required: true,
    validate: value => !validateEmail(value) && 'Please enter a valid email',
  },
  password: {
    required: true,
    validate: value => {
      const result = validatePassword(value);
      return !result.isValid && result.errors[0];
    },
  },
  phone: {
    validate: value => {
      if (!value) return;
      const result = validatePhone(value);
      return !result.isValid && result.error;
    },
  },
  url: {
    validate: value => {
      if (!value) return;
      const result = validateUrl(value);
      return !result.isValid && result.error;
    },
  },
  date: {
    validate: (value, options) => {
      if (!value) return;
      const result = validateDate(value, options);
      return !result.isValid && result.errors[0];
    },
  },
};
