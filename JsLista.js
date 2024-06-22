class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    remove() {
        if (this.head) {
            this.head = this.head.next;
        }
    }
}

const linkedList = new LinkedList(); // Lista Ligada

function pushData() {
    const inputData = document.getElementById('dataInput').value;
    linkedList.insert(inputData);
    updateDataDisplay();
    document.getElementById('dataInput').value = '';
}

function popData() {
    linkedList.remove();
    updateDataDisplay();
}

function updateDataDisplay() {
    const dataDisplay = document.getElementById('dataDisplay');
    const linkedListString = getLinkedListString(linkedList.head);
    dataDisplay.innerHTML = `
        <div class="linked-list-display">${linkedListString}</div>
    `;
}

function getLinkedListString(node) {
    let result = '';
    while (node) {
        result += `<span class="node">${node.value}</span>`;
        if (node.next) {
            result += `<span class="arrow">→</span>`;
        }
        node = node.next;
    }
    return result;
}
