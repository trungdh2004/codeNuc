import CodeSnippetDetail from "@/components/snippet/CodeSnippetDetail";

const TestPage = () => {
	const data = {
		message:
			"Thuật toán sắp xếp nổi bọt (Bubble Sort) là một thuật toán sắp xếp đơn giản, hoạt động bằng cách lặp đi lặp lại qua danh sách, so sánh các cặp phần tử liền kề và hoán đổi chúng nếu chúng không đúng thứ tự. Quá trình này được lặp lại cho đến khi không còn cặp phần tử nào cần hoán đổi nữa.",
		code: 'function bubbleSort(arr) {\n  let n = arr.length;\n  let swapped;\n  do {\n    swapped = false;\n    for (let i = 0; i < n - 1; i++) {\n      if (arr[i] > arr[i + 1]) {\n        // Swap arr[i] and arr[i+1]\n        let temp = arr[i];\n        arr[i] = arr[i + 1];\n        arr[i + 1] = temp;\n        swapped = true;\n      }\n    }\n    n--;\n  } while (swapped);\n  return arr;\n}\n\n// Example usage:\n// let array = [64, 34, 25, 12, 22, 11, 90];\n// let sortedArray = bubbleSort(array);\n// console.log("Sorted array: ", sortedArray);',
		language: "javascript",
	};

	return (
		<div>
			<CodeSnippetDetail language={"javascript"} code={data.code} />
		</div>
	);
};

export default TestPage;
