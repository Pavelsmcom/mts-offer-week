export function filterText(str) {
  if (str) {
    return str
      .replace('<nobr>', ' ')
      .replace('</nobr>', ' ')
      .replace('&nbsp;', ' ')
      .replace('&nbsp;', ' ')
      .replace('&nbsp;', ' ')
      .replace('&mdash;', ' ');
  }
}

export function sortProductCharacteristics(arr) {
  let sortedProductCharacteristics = {};

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].baseParameter === 'TvChannels') {
      sortedProductCharacteristics.tv = arr[i].value;
    } else if (arr[i].baseParameter === 'InternetPackage') {
      sortedProductCharacteristics.internet = arr[i].value;
    } else if (arr[i].baseParameter === 'MinutesPackage') {
      sortedProductCharacteristics.minutes = arr[i].value;
      sortedProductCharacteristics.minutesNum = arr[i].numValue;
    } else if (arr[i].baseParameter === 'MaxSpeed') {
      sortedProductCharacteristics.maxspeed = arr[i].value;
    }
  }
  return sortedProductCharacteristics;
}

export function deleteTag(str) {
  return str.replace('<br/>', ' ');
}

export function debounce(fn, ms) {
  let timeout;

  return function (...args) {
    const fnCall = () => {
      fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}
