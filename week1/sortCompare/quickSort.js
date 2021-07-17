export function quickSort(arr) {
  const partition = (arr, start, end) => {
    const swap = (a, b) => {
      const temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
    };

    let i = start, j = start;

    while (j < end) {
      if (arr[j] < arr[end]) {
        swap(i, j);
        i++;
      }
      j++;
    }

    swap(i, end);

    return i;
  };

  const quickSort_c = (arr, start, end) => {
    if (start >= end) {
      return;
    }

    const pivot = partition(arr, start, end);

    quickSort_c(arr, start, pivot - 1);
    quickSort_c(arr, pivot + 1, end);
  };

  quickSort_c(arr, 0, arr.length - 1);
}
