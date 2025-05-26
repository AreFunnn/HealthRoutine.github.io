document.addEventListener('DOMContentLoaded', function() {

});
    const buttons = document.querySelectorAll('.start-program');
    console.log('Debug: Buttons found:', buttons);
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            startWorkoutProgram(level);
        });
    });

    const level = new URLSearchParams(window.location.search).get('level') 
         || localStorage.getItem('currentWorkoutLevel');
    function loadExercises() {
        const exercises = {
            beginner: [{
            name: "Pemanasan Ringan",
            sets: "5 menit",
            rest: "30 sec rest",
            tips: "Keep knees behind toes"
        },
        {
            name: "Knee Push-ups",
            sets: "3 sets × 8 reps",
            rest: "30 sec rest", 
            tips: "Maintain straight back"
        },
        {
            name: "Plank",
            sets: "Hold 30 seconds",
            rest: "1 min rest",
            tips: "Engage your core"
        }],
            intermediate: [{
            name: "Goblet Squats",
            sets: "4 sets × 10 reps",
            rest: "45 sec rest",
            tips: "Hold weight close to chest"
        },
        {
            name: "Standard Push-ups",
            sets: "4 sets × 10 reps",
            rest: "45 sec rest",
            tips: "Full range of motion"
        },
        {
            name: "Dumbbell Rows",
            sets: "3 sets × 12 reps (each arm)",
            rest: "45 sec rest",
            tips: "Keep back flat"
        }],
            advanced: [{
            name: "Pistol Squats",
            sets: "3 sets × 8 reps",
            rest: "1 min rest",
            tips: "Keep your balance"
        },
        {
            name: "Archer Push-ups",
            sets: "3 sets × 6 reps (each side)",
            rest: "1 min rest",
            tips: "Lower yourself to one side"
        },
        {
            name: "Single-arm Dumbbell Rows",
            sets: "3 sets × 10 reps (each arm)",
            rest: "1 min rest",
            tips: "Keep your back straight"
        }]
        };

        const exercisesList = exercises[level].forEach(element => {
            document.getElementById('exercise-container').innerHTML += `
                <div class="exercise">
                    <h3>${element.name}</h3>
                    <p>${element.sets}</p>
                    <input type="checkbox" class="complete-exercise">
                </div>
            `;
        });
    }
    loadExercises();

document.querySelectorAll('.start-program').forEach(button => {
    button.addEventListener('click', function() {
        const level = this.getAttribute('data-level');
        startWorkoutProgram(level);
        localStorage.setItem('selectedWorkoutLevel', level);
        window.location.href = `workout-tracker.html?level=${level}`;
    });
});

function startWorkoutProgram(level) {
    // Show a modal or redirect
    const modal = document.createElement('div');
    modal.className = 'workout-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Memulai Program ${level.charAt(0).toUpperCase() + level.slice(1)}</h3>
            <p>Latihan pertama: ${getFirstExercise(level)}</p>
            <div class="timer" id="workout-timer">00:30</div>
            <button class="btn" id="close-modal">Tutup</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Timer functionality
    let seconds = 30;
    const timer = setInterval(() => {
        seconds--;
        modal.querySelector('#workout-timer').textContent = 
            `00:${seconds < 10 ? '0' + seconds : seconds}`;
        if(seconds <= 0) clearInterval(timer);
    }, 1000);
    
    // Close modal
    modal.querySelector('#close-modal').addEventListener('click', () => {
        modal.remove();
        clearInterval(timer);
    });
}

function getFirstExercise(level) {
    const exercises = {
        beginner: "Squat (3x10)",
        intermediate: "Weighted Squats (4x12)",
        advanced: "Pistol Squats (3x8)"
    };
    return exercises[level];
}
    function startWorkoutProgram(level) {
    window.location.href = `workout-tracker.html?level=${level}`;
}

let completedExercises = 0;
const totalExercises = exercises[level].length;

document.addEventListener('DOMContentLoaded', function() {
    // Update title
    document.getElementById('workout-title').textContent = 
        `${level.charAt(0).toUpperCase() + level.slice(1)} Workout`;
    
    // Checkbox functionality
    document.querySelectorAll('.complete-exercise').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if(this.checked) completedExercises++;
            else completedExercises--;
            
            updateProgress();
        });
    });
    
    // Complete workout button
    document.getElementById('complete-workout').addEventListener('click', function() {
        if(completedExercises === totalExercises) {
            alert("Great job! Workout completed!");
            // Save completion to localStorage
            const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');
            completedWorkouts.push({
                level: level,
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
        } else {
            alert(`Please complete all exercises (${completedExercises}/${totalExercises} done)`);
        }
    });
});

function updateProgress() {
    const progress = Math.round((completedExercises / totalExercises) * 100);
    console.log(`Progress: ${progress}%`);
}