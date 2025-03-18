// script.js
let userId = "User123"; // Assume this is fetched from authentication
let userPoints = 20; // Assume this is fetched from the backend

// Elements
const totalPointsElem = document.getElementById("totalPoints");
const transferToUsername = document.getElementById("transferToUsername");
const transferAmount = document.getElementById("transferAmount");
const transferPointsBtn = document.getElementById("transferPointsBtn");
const transferStatus = document.getElementById("transferStatus");
const answersList = document.getElementById("answersList");

// Example answers (In real use, this would be fetched from a database)
const userAnswers = [
    { answerId: "answer123", points: 5, upvotes: 5, downvotes: 1, isActive: true },
    { answerId: "answer124", points: 3, upvotes: 3, downvotes: 0, isActive: true },
];

// Display user answers and their points
function displayAnswers(answers) {
    answersList.innerHTML = ''; // Clear current list
    answers.forEach(answer => {
        const answerElem = document.createElement("div");
        answerElem.textContent = `Answer ID: ${answer.answerId}, Points: ${answer.points}`;
        answersList.appendChild(answerElem);
    });
}

displayAnswers(userAnswers);

// Function to handle points transfer
function transferPoints() {
    const recipientUsername = transferToUsername.value;
    const amount = parseInt(transferAmount.value);

    if (amount <= 0) {
        transferStatus.textContent = "Please enter a valid amount to transfer.";
        return;
    }

    if (userPoints < 10) {
        transferStatus.textContent = "You need at least 10 points to transfer.";
        return;
    }

    if (amount > userPoints) {
        transferStatus.textContent = "You do not have enough points to transfer.";
        return;
    }

    // Simulate sending points to the backend
    // Check if the recipient exists (mocked here)
    const recipientExists = true; // In a real app, this would query the backend.

    if (recipientExists) {
        userPoints -= amount; // Deduct points from the sender
        totalPointsElem.textContent = userPoints;

        // Optionally, log the transfer (for audit or tracking purposes)
        const transferData = {
            fromUserId: userId,
            toUserId: recipientUsername, // In a real app, we would fetch user ID
            pointsTransferred: amount,
            timestamp: new Date(),
        };

        // Simulate sending data to the backend
        console.log("Transfer Data:", transferData);

        transferStatus.textContent = `You successfully transferred ${amount} points to ${recipientUsername}.`;
    } else {
        transferStatus.textContent = "Recipient username not found.";
    }
}

// Function to handle answer deletion (and reduce points)
function deleteAnswer(answerId) {
    const answerIndex = userAnswers.findIndex(answer => answer.answerId === answerId);
    if (answerIndex !== -1) {
        const deletedAnswer = userAnswers.splice(answerIndex, 1)[0];
        userPoints -= deletedAnswer.points; // Reduce points by answer's points
        totalPointsElem.textContent = userPoints;
        displayAnswers(userAnswers);
        console.log(`Answer ${answerId} deleted. Points reduced by ${deletedAnswer.points}`);
    }
}

// Simulate deleting an answer (for testing)
deleteAnswer("answer123");
