let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

function saveIdeas() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
}

function addIdea() {
    const title = document.getElementById("ideaTitle").value;
    const desc = document.getElementById("ideaDesc").value;

    if (title === "" || desc === "") {
        alert("Please fill all fields");
        return;
    }

    ideas.push({
        title: title,
        description: desc,
        feedbacks: []
    });

    saveIdeas();
    document.getElementById("ideaTitle").value = "";
    document.getElementById("ideaDesc").value = "";
    displayIdeas();
}

function addFeedback(index) {
    const feedbackInput = document.getElementById(`feedback-${index}`);
    const feedbackText = feedbackInput.value;

    if (feedbackText === "") return;

    ideas[index].feedbacks.push(feedbackText);
    saveIdeas();
    feedbackInput.value = "";
    displayIdeas();
}

function displayIdeas() {
    const container = document.getElementById("ideasContainer");
    container.innerHTML = "";

    ideas.forEach((idea, index) => {
        const ideaDiv = document.createElement("div");
        ideaDiv.className = "idea";

        ideaDiv.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>

            <input type="text" id="feedback-${index}" placeholder="Enter feedback"><br>
            <button onclick="addFeedback(${index})">Add Feedback</button>

            <h4>Feedback:</h4>
        `;

        idea.feedbacks.forEach(fb => {
            const fbDiv = document.createElement("div");
            fbDiv.className = "feedback";
            fbDiv.innerText = fb;
            ideaDiv.appendChild(fbDiv);
        });

        container.appendChild(ideaDiv);
    });
}

displayIdeas();