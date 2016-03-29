export function validateAddUser (data) {
  const errors = {}
  if (!data.name) {
    errors.name = 'Required'
    return errors
  }
  if (!data.email) {
    errors.email = 'Required'
    return errors
  }
  if (!data.password) {
    errors.password = 'Required'
    return errors
  }
  if (!data.repeat) {
    errors.repeat = 'Required'
    return errors
  }
  if (data.password !== data.repeat) {
    errors.repeat = 'Confirm Password must match Password'
    return errors
  }
  if (data.password === data.email) {
    errors.password = 'Cannot set password equal with email'
    return errors
  }
  if(data.password.length < 8) {
    errors.password = "Error: Password must contain at least eight characters!";
    return errors
  }

  let re = /[0-9]/;
  if(!re.test(data.password)) {
    errors.password = "Error: password must contain at least one number (0-9)!";
    return errors
  }

  re = /[a-z]/;
  if(!re.test(data.password)) {
    errors.password = "Error: password must contain at least one lowercase letter (a-z)!";
    return errors
  }

  re = /[A-Z]/;
  if(!re.test(data.password)) {
    errors.password = "Error: password must contain at least one uppercase letter (A-Z)!";
    return errors
  }
  return errors
}

export function validateEditUser (data) {
  const errors = {}
  return errors
}

export function validateGetPassReset (data) {
  const errors = {}
  if (!data.email) {
    errors.email = 'Required'
  }
  return errors
}

export function validateSetNewPassword (data) {
  const errors = {}
  if (!data.password) {
    errors.password = 'Required'
  }
  if (!data.repeat) {
    errors.repeat = 'Required'
  }
  if (data.password !== data.repeat) {
    errors.repeat = 'Confirm Password must match Password'
  }
  return errors
}

export function validateInviteUser (data) {
  const errors = {}
  if (!data.email) {
    errors.email = 'Required'
  }
  return errors
}

export function validateAddClient (data) {
  const errors = {}
  return errors
}

export function validateEditClient (data) {
  const errors = {}
  return errors
}
