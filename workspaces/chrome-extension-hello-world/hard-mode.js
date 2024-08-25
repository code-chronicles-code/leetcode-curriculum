console.log('hard-mode.js Running');

const difficulty_conversion = {
    'Easy': 'Brutal',
    'Medium': 'Excruciating',
    'Hard': 'Soul-Crushing',
    'Brutal': 'Brutal',             // In order to keep it from going to undefined if run too many times
    'Excruciating': 'Excruciating',
    'Soul-Crushing': 'Soul-Crushing'
}

const problem_difficulty_classes = ["text-olive dark:text-dark-olive", "text-yellow dark:text-dark-yellow", "text-pink dark:text-dark-pink"];

let problemClearingInterval = setInterval(clearProblemSetDifficulties, 100); // Needed because we have to wait for leetcode to request problems (nonblockingly)

function clearProblemSetDifficulties() {
    console.log("Clearing Difficulties")
    let finished = false;
    for (const difficulty of problem_difficulty_classes){
    Array.from(document.getElementsByClassName(difficulty)).forEach(
        (elem)=> {
            elem.setAttribute("class", "text-olive dark:text-dark-olive");
            elem.innerText = difficulty_conversion[elem.innerText];
            finished = true;
        });
    }

    // if (finished) {          // We need it to run multiple times cause changes don't stick
    //     console.log("Cleared")
    //     clearInterval(problemClearingInterval);
    // }
}


function clearIndividualProblemDifficulty() {
    let difficulty_elem = document.getElementsByClassName("dark:text-difficulty-hard")[0] || document.getElementsByClassName("dark:text-difficulty-easy")[0] || document.getElementsByClassName("dark:text-difficulty-medium")[0];
    difficulty_elem.innerText = difficulty_conversion[difficulty_elem.innerText];
    difficulty_elem.setAttribute("class", "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-easy dark:text-difficulty-easy");
}
