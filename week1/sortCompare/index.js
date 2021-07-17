import { quickSort } from './quickSort.js';
/*let dataArr = [2, 3, 11, 0, 9, 5, 8, 2, 1, 7];
let dataArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0];
let dataArr3 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

quickSort(dataArr);

console.log(dataArr);*/

function produceData() {
  let arr = [];
  for (let i = 0; i < 5000; i++) {
    arr.push(Math.floor(Math.random() * 5000));
  }
  return arr;
}

function run() {
  const data1 = produceData();
  const data2 = [...data1];

  console.log(data1);

  dataDiv.innerHTML = `
    <h2>Sort Array: </h2>
    [${data1.join(', ')}]
  `;

  let start = performance.now();
  quickSort(data1);
  const timeQuickSort = performance.now() - start;

  start = performance.now();
  data2.sort((a, b) => a - b);
  const timeArraySort = performance.now() - start;

  resultDiv.innerHTML = `
    <h2>Run Time: </h2>
    <p>Quick Sort time: ${timeQuickSort}ms</p>
    <p>Array.prototype.sort time: ${timeArraySort}ms</p>
  `;

  console.log(data1);
  console.log(data2);
}

const btn = document.getElementById('btn');
const dataDiv = document.getElementById('data');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', run);

