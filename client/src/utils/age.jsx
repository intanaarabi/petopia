export const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
  
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return `${years} years ${months} months`;
  };

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
