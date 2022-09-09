let editor = undefined;

const copyCode = () => {
	const virtualTextArea = document.createElement('textarea');
	virtualTextArea.value =  document.getElementById("dialog-code").value;
	document.body.appendChild(virtualTextArea);
	virtualTextArea.select();
	document.execCommand("copy");
	document.body.removeChild(virtualTextArea);
	alert("复制成功");
}

const expandCode = () => {
	document.getElementById("code-dialog-div").classList.remove("hide-code-dialog");
	if (!editor) {
		editor = CodeMirror.fromTextArea(document.getElementById("dialog-code"), {
			lineNumbers: true, // 显示行数
			indentUnit: 4, // 缩进单位为4
			mode: 'htmlmixed', // HMTL混合模式
			lineWrapping: true, // 自动换行
			readOnly: true,
		});
	}
}

const closeDialog = () => {
	document.getElementById("code-dialog-div").classList.add("hide-code-dialog");
}