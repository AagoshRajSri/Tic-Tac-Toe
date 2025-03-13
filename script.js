let boxes = document.querySelectorAll(".box");
let resetbtn = document.getElementById("resetbtn"); // Assuming this is the reset button
let newbtn = document.querySelector('#newbtn'); // Assuming this is the "New Game" button
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winpattern = [[0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 4, 6]
];

// Function to reset the game state
const resetgame = () => {
    turnO = true; // Set the first player's turn (O)
    gameOver = false; // Game is not over initially
    enableboxes(); // Enable all the boxes
    msgcontainer.classList.add("hide"); // Hide the winner message
};

// Function to enable all the boxes for interaction
const enableboxes = () => {
    boxes.forEach((box) => {
        box.style.pointerEvents = "auto"; // Enable interaction with the box
        box.innerText = ""; // Clear the box text
        box.style.backgroundColor = ""; // Reset background color
        box.style.color = ""; // Reset color
    });
};

// Show winner message
const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is Player ${winner}`;
    msgcontainer.classList.remove("hide"); // Show the winner message
};

// Check for winner based on the winning patterns
const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("The winner is Player", pos1);
                showwinner(pos1);
                // Highlight the winning boxes
                boxes[pattern[0]].style.backgroundColor = "green";
                boxes[pattern[0]].style.color = "black";
                boxes[pattern[1]].style.backgroundColor = "green";
                boxes[pattern[1]].style.color = "black";
                boxes[pattern[2]].style.backgroundColor = "green";
                boxes[pattern[2]].style.color = "black";
                
                gameOver = true; // End the game
                return; // Exit once we find a winner
            }
        }
    }
};

// Add event listeners for each box
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (gameOver) {
            return; // If the game is over, do nothing
        }

        // Set the text and style based on the current player's turn
        if (turnO === true) {
            box.style.backgroundColor = "blue";
            box.innerText = "O";
            turnO = false; // Switch to player X's turn
        } else {
            box.style.backgroundColor = "red";
            box.innerText = "X";
            turnO = true; // Switch to player O's turn
        }
        
        box.style.pointerEvents = "none"; // Disable further clicks on the box
        checkwinner(); // Check if there is a winner
    });
});

// Event listener for "New Game" button
newbtn.addEventListener("click", resetgame);

// Event listener for the reset button (if you have a separate reset functionality)
resetbtn.addEventListener("click", resetgame);
