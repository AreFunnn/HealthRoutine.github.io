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

    localStorage.setItem(`progress-${level}`, 
  JSON.stringify(Array.from(document.querySelectorAll('input')).map(i => i.checked))
);

// Load saved progress
const saved = JSON.parse(localStorage.getItem(`progress-${level}`) || '[]');
saved.forEach((checked, i) => {
  const checkbox = document.getElementById(`ex-${i}`);
  if(checkbox) checkbox.checked = checked;
});