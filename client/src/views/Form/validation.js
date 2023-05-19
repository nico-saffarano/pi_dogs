const validate = (form) => {
  let errors = {}
  if(!form.name){
      errors.name = 'Must be a name'
  }

  if(form.name && !/^[a-zA-Z]*$/.test(form.name)){
      errors.name = 'The name can not contain numbers or special caracters'
  }

  if(!form.height_min || form.height_min <= 0){
      errors.height_min = 'The min height must be bigger'
  }
  if(!form.height_max || form.height_max <= 0){
      errors.height_max = 'The max height must be bigger'
  }

  if(Number(form.height_min) >= Number(form.height_max)){
      errors.especial1 = 'The height min can not be bigger or equal than the max height'
  }

  if(Number(form.weight_min) >= Number(form.weight_max)){
      errors.especial2 = 'The weight min can not be bigger or equal than the max weight'
  }


  if(form.height){
      if (!/^[0-9]*$/){
          errors.height = 'It must be only numbers'
      }
  }
  if (!form.weight_min || form.weight_min <= 0){
      errors.weight_min = 'The min weight must be bigger'
  }

  if(form.weight_min){
      if(form.weight_max){
          if (!/^[0-9]*$/) {
              errors.weight_min = 'It must be only numbers'
          }
      }
  }
  
  if (!form.weight_max || form.weight_max <= 0){
      errors.weight_max = 'The max weight must be bigger'
  }
  if(form.weight_max){
      if (!/^[0-9]*$/) {
          errors.weight_max = 'It must be only numbers'
      }
  }

  if (!form.life_span || form.life_span <= 0){
      errors.life_span = 'The life span must be grather'
  }
  if(form.life_span){
      if (!/^[0-9]*$/) {
          errors.life_span = 'It must be only numbers'
      }
  }

  return errors

}

export default validate;