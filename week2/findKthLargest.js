/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  if (k < 0 || k > nums.length) {
    return null;
  }

  const swap = (start, end) => {
    [nums[start], nums[end]] = [nums[end], nums[start]];
  };

  const partition = (start, end) => {
    let i = start, j = start;

    while (j < end) {
      if (nums[j] > nums[end]) {
        swap(i, j);
        i++;
      }

      j++;
    }

    swap(i, end);

    return i;
  };

  let start = 0, end = nums.length - 1;

  while (true) {
    const pivot = partition(start, end);

    if (k === pivot + 1) {
      return nums[pivot];
    } else if (k < pivot + 1) {
      end = pivot - 1;
    } else {
      start = pivot + 1;
    }
  }
};

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);
console.log(findKthLargest([], 4), null);
