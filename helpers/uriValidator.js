export function uriValidator(uri) {
    const pattern = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/;
   if( pattern.test(uri))
   {
    return ''
   }
   else
   {
    return 'Invalid URI!'
   }
  }