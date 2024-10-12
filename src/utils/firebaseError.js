// errorHandling.js
export const getErrorMessage = (error) => {
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please check your email or sign up.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later or reset your password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid login credentials. Please try again.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password login is not enabled. Please contact support.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login popup was closed before completion.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Login operation cancelled due to another pending login.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'Login not allowed from this domain.';
          break;
        case 'auth/unknown':
          errorMessage = 'An unknown error occurred. Please try again later.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return errorMessage;
  };