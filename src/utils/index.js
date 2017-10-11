export function copyProperties(source, target) {
  for (const item in target) {
    if (source[item] != undefined) {
      if ((target[item] instanceof Object) && !(target[item] instanceof Array)) {
        copyProperties(source[item], target[item])
      } else {
        target[item] = source[item];
      }
    }
  }
}
