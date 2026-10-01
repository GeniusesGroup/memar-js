/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 * @param {Blob} blob 
 * @param {string} fileName 
 */
function FileSaver(blob, fileName) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = fileName
    a.href = url
    a.click()
    window.URL.revokeObjectURL(url)
}

async function FileReader() {
    
    function loadFile() {
        var input, file, fr;

        if (typeof window.FileReader !== 'function') {
            bodyAppend("p", "The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('fileinput');
        if (!input) {
            bodyAppend("p", "Um, couldn't find the file input element.");
        }
        else if (!input.files) {
            bodyAppend("p", "This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            bodyAppend("p", "Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        function receivedText() {
            showResult(fr, "Text");

            fr = new FileReader();
            fr.onload = receivedBinary;
            fr.readAsBinaryString(file);
        }

        function receivedBinary() {
            showResult(fr, "Binary");
        }
    }

}