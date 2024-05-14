const generateVerificationToken = () => {
    // Generate a random string of 32 characters
    const token = Math.random().toString(36).substring(2, 34);
    return token;
  };
  
  export default generateVerificationToken;