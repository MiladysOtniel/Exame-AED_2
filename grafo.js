// Definição do Grafo usando JavaScript puro
class Graph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertex) {
        if (!this.vertices[vertex]) {
            this.vertices[vertex] = {};
        }
    }

    removeVertex(vertex) {
        if (this.vertices[vertex]) {
            for (let adjacentVertex in this.vertices[vertex]) {
                this.removeEdge(vertex, adjacentVertex);
            }
            delete this.vertices[vertex];
        }
    }

    addEdge(vertex1, vertex2, weight = 1) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.vertices[vertex1][vertex2] = weight;
        this.vertices[vertex2][vertex1] = weight;
    }

    removeEdge(vertex1, vertex2) {
        if (this.vertices[vertex1] && this.vertices[vertex1][vertex2]) {
            delete this.vertices[vertex1][vertex2];
        }
        if (this.vertices[vertex2] && this.vertices[vertex2][vertex1]) {
            delete this.vertices[vertex2][vertex1];
        }
    }

    getVertices() {
        return Object.keys(this.vertices);
    }

    getEdges() {
        let edges = [];
        for (let vertex in this.vertices) {
            for (let adjacentVertex in this.vertices[vertex]) {
                edges.push([vertex, adjacentVertex, this.vertices[vertex][adjacentVertex]]);
            }
        }
        return edges;
    }
}

let graph;
let canvasWidth = 800;
let canvasHeight = 500;

let offsetX = 0;
let offsetY = 0;
let scaleFactor = 1.0;
let minScale = 0.5;
let maxScale = 2.0;
let dragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight).parent('sketch-container');
    canvas.mouseWheel(handleMouseWheel);
    canvas.mousePressed(startDragging);
    canvas.mouseReleased(stopDragging);

    graph = new Graph();
}

function draw() {
    background(255);
    translate(offsetX, offsetY);
    scale(scaleFactor);
    textSize(20);
    textAlign(CENTER, CENTER);

    drawGraph();
}

function drawGraph() {
    const vertices = graph.getVertices();
    const edges = graph.getEdges();

    // Desenhar arestas
    edges.forEach(edge => {
        const [vertex1, vertex2, weight] = edge;
        const pos1 = getPosition(vertex1);
        const pos2 = getPosition(vertex2);
        stroke(0,0,255);
        line(pos1.x, pos1.y, pos2.x, pos2.y);
        noStroke();
        fill(0);
        text(weight, (pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2);
    });

    // Desenhar vértices
    vertices.forEach(vertex => {
        const pos = getPosition(vertex);
        fill(0, 116, 217);
        noStroke();
        circle(pos.x, pos.y, 40);
        fill(255);
        text(vertex, pos.x, pos.y);
    });
}

function getPosition(vertex) {
    const index = graph.getVertices().indexOf(vertex);
    const angle = index * TWO_PI / graph.getVertices().length;
    const radius = 200;
    const x = canvasWidth / 2 + radius * cos(angle);
    const y = canvasHeight / 2 + radius * sin(angle);
    return { x, y };
}

function handleMouseWheel(event) {
    let delta = event.deltaY * -0.01;
    let zoom = scaleFactor + delta;
    scaleFactor = constrain(zoom, minScale, maxScale);
    return false;
}

function startDragging() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        dragging = true;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
}

function stopDragging() {
    dragging = false;
}

function mouseDragged() {
    if (dragging) {
        let dx = mouseX - lastMouseX;
        let dy = mouseY - lastMouseY;
        offsetX += dx / scaleFactor;
        offsetY += dy / scaleFactor;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
}

function insertVertex() {
    const vertexInput = document.getElementById("insertVertexValue");
    const vertex = vertexInput.value.trim();
    if (vertex) {
        graph.addVertex(vertex);
        vertexInput.value = "";
    } else {
        alert("Por favor, insira um vértice válido.");
    }
}

function removeVertex() {
    const vertexInput = document.getElementById("removeVertexValue");
    const vertex = vertexInput.value.trim();
    if (vertex) {
        graph.removeVertex(vertex);
        vertexInput.value = "";
    } else {
        alert("Por favor, insira um vértice válido.");
    }
}

function insertEdge() {
    const fromInput = document.getElementById("insertEdgeFrom");
    const toInput = document.getElementById("insertEdgeTo");
    const weightInput = document.getElementById("insertEdgeWeight");
    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const weight = parseInt(weightInput.value);
    if (from && to && !isNaN(weight)) {
        graph.addEdge(from, to, weight);
        fromInput.value = "";
        toInput.value = "";
        weightInput.value = "";
    } else {
        alert("Por favor, insira valores válidos.");
    }
}

function removeEdge() {
    const fromInput = document.getElementById("removeEdgeFrom");
    const toInput = document.getElementById("removeEdgeTo");
    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    if (from && to) {
        graph.removeEdge(from, to);
        fromInput.value = "";
        toInput.value = "";
    } else {
        alert("Por favor, insira valores válidos.");
    }
}
