export function phoneValidator(phone) {
  if (!phone) return "Phone number can't be empty."
  if (phone.length < 9) return 'Phone number must be at least 9 digits long.'
  return ''
}
