function mergeSort(array) {
  function doMergeSort(arr) {
    if (arr.length == 1) {
      return arr;
    } else {
      const splitArr = divideArr(arr);
      let firstHalf = doMergeSort(splitArr.firstHalf);
      let secondHalf = doMergeSort(splitArr.secondHalf);
      let newArr;
      newArr = merge(firstHalf, secondHalf);
      return newArr;
    }
  }

  function divideArr(arr) {
    const halfLength = Math.floor(arr.length / 2);
    let firstHalf = arr.splice(0, halfLength);
    let secondHalf = arr;
    return { firstHalf, secondHalf };
  }

  function merge(arr1, arr2) {
    const newArr = [];
    do {
      const arr1Val = arr1[0];
      const arr2Val = arr2[0];

      arr1Val == undefined ? newArr.push(arr2.shift()) : null;
      arr2Val == undefined ? newArr.push(arr1.shift()) : null;
      arr1Val < arr2Val ? newArr.push(arr1.shift()) : null;
      arr2Val < arr1Val ? newArr.push(arr2.shift()) : null;
    } while (arr1.length > 0 || arr2.length > 0);

    return newArr;
  }

  return doMergeSort(array);
}

export { mergeSort };
