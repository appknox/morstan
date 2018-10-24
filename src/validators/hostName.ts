export default function hostNameValidator(hostName: string) {
  const hostNameRE = new RegExp([
    '^(http:\/\/|https:\/\/)?',
    '([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}',
    '|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
    '\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
    '\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
    '\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))',
    '(:[0-9]{1,5})?(\/.*)?$',
  ].join(''));
  return hostNameRE.test(hostName) ? true : false;
}
