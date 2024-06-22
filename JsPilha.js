const dataStack = []; // Pilha

function pushData() {
    const inputData = document.getElementById('dataInput').value;
    dataStack.push(inputData);
    updateDataDisplay();
    document.getElementById('dataInput').value = '';
}

function popData() {
    dataStack.pop();
    updateDataDisplay();
}

function updateDataDisplay() {
    const dataDisplay = document.getElementById('dataDisplay');
    const stackString = getStackString(dataStack);
    dataDisplay.innerHTML = `
        <div class="stack-display">${stackString}</div>
    `;
}

function getStackString(stack) {
    let result = '';
    for (let i = stack.length - 1; i >= 0; i--) {
        result += `<div class="stack-node">${stack[i]}</div>`;
        if (i > 0) {
            result += `<div class="stack-arrow">↑</div>`;
        }
    }
    return result;
}
