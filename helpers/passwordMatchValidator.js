export function passwrodMatchValidator(password, confirmPassword) {
  if (password !== confirmPassword) return "Password and confirm password must be match."
  return ''
}
