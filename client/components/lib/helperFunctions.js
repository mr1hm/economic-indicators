function abbreviateNumbers(value) {
  let noDotValue, suffixes = ['', 'K', 'M', 'T'];
  if (value.includes('.')) noDotValue = value.split('.')[0];

}

module.exports = {
  abbreviateNumbers
}
