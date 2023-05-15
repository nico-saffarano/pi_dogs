export const handleChange = (event) => {
  setUserData({
    ...userData,
    [event.target.name]: event.target.value,
  });

  setErrors(
    validation({
      ...userData,
      [event.target.name]: event.target.value,
    })
  );
}
  
export  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

