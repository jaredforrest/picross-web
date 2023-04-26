/*export const sideNums0 = [
  [17, 4, 1, 4, 17],
  [3, 6, 6, 3, 2, 20],
  [3, 4, 11, 4, 8, 1, 10],
  [2, 5, 21, 1, 1, 7, 5],
  [1, 10, 4, 3, 14, 4],
  [6, 1, 2, 13, 1, 19],
  [3, 6, 18, 9, 6, 3],
  [2, 5, 2, 15, 6, 6, 1],
  [2, 4, 2, 6, 2, 2, 8, 14],
  [1, 4, 2, 6, 2, 3, 1, 8, 6, 5],
  [1, 3, 3, 6, 2, 3, 2, 19],
  [8, 6, 2, 2, 2, 6, 6, 4],
  [4, 3, 5, 6, 3, 12, 3],
  [18, 1, 3, 5, 9],
  [2, 2, 9, 7, 11, 2],
  [5, 6, 1, 3, 3, 5, 5, 2],
  [2, 8, 2, 2, 4, 5, 7],
  [2, 1, 6, 1, 5, 2, 3, 9],
  [2, 1, 4, 8, 2, 3, 2, 3, 2],
  [2, 3, 1, 1, 5, 2, 3, 5, 2],
  [3, 3, 2, 4, 4, 2, 2, 1, 5],
  [2, 3, 2, 3, 4, 2, 3, 4, 1],
  [2, 3, 2, 3, 2, 1, 3, 8],
  [3, 2, 2, 2, 3, 1, 6, 8],
  [5, 4, 3, 1, 3, 5, 7],
  [5, 15, 3, 1, 3, 1, 3, 1],
  [21, 6, 1, 3, 4, 1],
  [7, 3, 4, 15, 6],
  [1, 5, 9, 3, 2, 4, 6, 1, 3],
  [1, 14, 3, 2, 9, 3, 2, 2],
  [1, 11, 3, 2, 2, 3, 1, 2, 5],
  [6, 3, 2, 3, 2, 2, 2, 2, 2],
  [2, 3, 2, 1, 3, 1],
  [2, 3, 1, 3],
  [6, 1, 4],
  [6, 1, 4],
  [2, 3, 1, 3],
  [1, 4, 1, 3, 1],
  [1, 4, 1, 3, 2],
  [1, 3, 7],
  [1, 1, 1, 7],
  [2, 1, 2, 4, 2, 1],
  [8, 1, 2, 5],
  [9, 2, 1, 1, 4, 2],
  [2, 2, 4, 4, 2, 1, 7],
  [2, 1, 4, 4, 5, 3, 3],
  [3, 6, 5, 7],
  [3, 6, 7],
  [2, 6, 7],
  [3, 1, 3, 2, 5],
  [4, 1, 3, 4, 7, 4],
  [1, 2, 2, 3, 1, 17, 2],
  [1, 6, 4, 11, 2, 2],
  [1, 1, 3, 4, 2, 2, 3],
  [4, 3, 4, 2, 2, 3],
  [4, 8, 10, 3],
  [2, 3, 2, 5, 6, 2],
  [1, 4, 2, 5, 3],
  [2, 8, 5, 3],
  [3, 5, 2, 5, 3],
  [4, 14, 3],
  [2, 13, 3],
  [3, 15, 1, 4],
  [2, 2, 4, 2, 15],
  [3, 2, 3, 2, 10]
]

export const topNums0 = [
  [19, 25, 6, 1, 3],
  [4, 4, 8, 8, 6, 10, 7],
  [3, 3, 5, 1, 13, 2, 2, 10, 4],
  [1, 3, 6, 6, 15, 3, 3, 5, 5],
  [1, 10, 4, 26, 1, 2, 5, 3],
  [10, 4, 8, 14, 2, 3, 5, 5, 1],
  [5, 3, 4, 8, 6, 13, 5, 7],
  [5, 2, 12, 2, 4, 10, 1, 3, 7],
  [2, 4, 2, 6, 2, 5, 9, 8, 1],
  [2, 2, 1, 2, 7, 8, 4, 5, 4, 1, 2, 4],
  [6, 2, 8, 7, 3, 2, 6, 6],
  [1, 6, 7, 2, 7, 1, 6, 6],
  [1, 2, 1, 7, 3, 12, 8, 5],
  [4, 2, 9, 6, 5, 1, 9, 1],
  [4, 2, 4, 2, 6, 2, 3, 8],
  [4, 6, 9, 3, 3, 8],
  [4, 5, 2, 5, 4, 1, 1, 1, 5, 1],
  [3, 4, 5, 11, 1, 3, 5],
  [3, 3, 3, 1, 3, 4, 5, 1, 5, 4],
  [1, 2, 6, 5, 3, 8, 3, 3, 2, 3],
  [1, 8, 2, 10, 4, 2, 4, 3, 1, 3],
  [2, 5, 2, 6, 8, 3, 3, 2, 2],
  [2, 5, 2, 3, 2, 2, 2, 2],
  [10, 3, 1, 2, 2, 2],
  [1, 2, 5, 2, 1, 2, 2, 2],
  [2, 3, 2, 2, 2, 2, 3],
  [5, 5, 3, 3, 2, 2],
  [2, 6, 1, 2, 3, 1, 2],
  [1, 3, 4, 3, 1, 2, 2, 2],
  [1, 2, 3, 3, 1, 3, 2, 2, 1],
  [2, 1, 2, 2, 2, 4, 2],
  [2, 3, 3, 2, 1, 1, 3, 2],
  [6, 4, 7, 2, 2],
  [3, 3, 4, 7, 3],
  [8, 4, 7, 3],
  [3, 10, 2, 3, 3],
  [2, 6, 6, 1, 2, 1, 1, 3],
  [19, 6, 1, 3, 4],
  [2, 8, 13, 3, 4],
  [2, 3, 13, 4, 2, 3],
  [7, 5, 3, 3, 6, 3],
  [7, 7, 3, 2, 6, 1, 4],
  [16, 3, 3, 7, 2, 3, 3],
  [3, 5, 8, 2, 4, 23],
  [3, 16, 4, 2, 10, 8],
  [4, 6, 20, 4, 2, 8],
  [6, 5, 15, 4, 2, 6, 4],
  [14, 2, 9, 1, 4, 5],
  [7, 13, 3, 5, 3, 7],
  [8, 22, 3, 85]
]
*/

/*
export const sideNums = [
[10],
[3,2],
[2,1,1,1,1],
[1,9,1],
[2,1,1,1,2],
[2,3],
[10],
[0],
[4],
[2,3],
[3,1,1],
[1,1,1,1,2,2,1],
[1,1,1,2,1,1,1],
[6,1,1,1,1],
[1,1,1,1,1,1,1],
[6,2,2,1,1,1],
[1,5,1,1,1,1],
[1,1,1,3,2],
[1,1,2,2],
[1,1,5],
]

export const topNums = [
[3,3,2],
[2,2,3,3],
[1,2,3,2],
[2,1,1,5],
[1,1,1,3,2],
[1,3,1,7],
[1,1,1,1],
[1,3,1,1],
[1,1,1,1],
[1,3,1],
[1,1,1,4],
[1,1,2,3,3],
[2,1,2,2],
[1,2,4,4],
[3,1,5,1],
[1,1],
[2,4,1],
[3,2,2],
[1,2],
[8],
] */
