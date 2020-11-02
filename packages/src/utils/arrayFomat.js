export default {
  bubbleAsSort (arr) { // 冒泡排序-升序
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  },
  bubbleDeSort (arr) { // 冒泡排序-降序
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] < arr[j + 1]) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  },

  selectAsSort (arr) { // 选择排序-升序
    let minIndex, temp;
    for (let i = 0; i < arr.length - 1; i++) {
      minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;
  },

  selectDeSort (arr) { // x选择排序-降序
    let minIndex, temp;
    for (let i = 0; i < arr.length - 1; i++) {
      minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] > arr[minIndex]) {
          minIndex = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;
  },

  insertAsSort (arr) { // 插入排序-升序
    let current, preIndex;
    for (let i = 1; i < arr.length; i++) {
      current = arr[i];
      preIndex = i - 1;
      while (preIndex >= 0 && arr[preIndex] > current) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
      }
      arr[preIndex + 1] = current;
    }
    return arr;

  },

  bubbleDeSort2 (arr) { // 插入排序-降序
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] < arr[j + 1]) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }

}