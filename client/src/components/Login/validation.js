const validation = (userData) => {
  const errors = {};

  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)){
      errors.email = 'Invalid email';
  }
  if(!userData.email){ // userData.email.length === ''
      errors.email = 'You have to enter an email';
  }
  if(userData.email.length > 35){
      errors.email = 'The email must not exceed 35 characters'
  }
  if(!/.*\d+.*/.test(userData.password)){
      errors.password = 'Password must contain at least one numeric character'
  }
  if(userData.password.length < 6 || userData.password.length > 14){
      errors.password = 'The password must be between 6 and 14 characters in length'
  }

  return errors;
}

export default validation;