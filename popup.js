document.addEventListener("DOMContentLoaded", function () {
    const goalInput = document.getElementById("goalInput");
    const addGoalButton = document.getElementById("addGoal");
    const goalList = document.getElementById("goalList");

    chrome.storage.sync.get(["goals"], function (data) {
        if (data.goals) {
            data.goals.forEach(goal => addGoalToUI(goal));
        }
    });

    addGoalButton.addEventListener("click", function () {
        const goal = goalInput.value.trim();
        if (goal) {
            chrome.storage.sync.get(["goals"], function (data) {
                const goals = data.goals || [];
                goals.push(goal);
                chrome.storage.sync.set({ "goals": goals }, function () {
                    addGoalToUI(goal);
                    goalInput.value = "";
                });
            });
        }
    });

    function addGoalToUI(goal) {
        const li = document.createElement("li");
        li.textContent = goal;
        goalList.appendChild(li);
    }
});
