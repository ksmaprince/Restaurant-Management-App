export function numericValidator(input) {
  //  a regular expression pattern for num like  3.14
  const pattern = /^[0-9]*\.[0-9]+$/;

  if(pattern.test(input))
  {
    return ''
  }
  else
  {
    return 'Must Input Numeric price!'
  };
}
