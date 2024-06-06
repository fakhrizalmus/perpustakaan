function authenticate(a, b) {
    const email = 'fakhrizal@gmail.com';
    const password = '12345';
    if ((email === a) && (password === b)) {
      return true
    }
  }
  
  const authenticated = authenticate('fakhrizal@gmail.com', '12345')
  
  module.exports = {
    authenticate,
    authenticated
  }