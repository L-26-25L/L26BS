const initialData = {
    "Economy": {
        logic: "best_4_of_5", // يحذف أقل كويز
        assessments: [
            { type: "Midterm 1", total: 15, obtained: 13 },
            { type: "Midterm 2", total: 15, obtained: 15 },
            { type: "Quiz 1", total: 5, obtained: 5 },
            { type: "Quiz 2", total: 5, obtained: 4 },
            { type: "Quiz 3", total: 5, obtained: 5 },
            { type: "Quiz 4", total: 5, obtained: 3 },
            { type: "Quiz 5", total: 5, obtained: 4.5 },
            { type: "Final exam", total: 50, obtained: 0 }
        ]
    },
    "Math": {
        logic: "fixed",
        assessments: [
            { type: "Midterm", total: 25, obtained: 22 },
            { type: "Quiz 1", total: 10, obtained: 10 },
            { type: "Quiz 2", total: 10, obtained: 9 },
            { type: "Quiz 3", total: 10, obtained: 9.5 },
            { type: "Laboratory test", total: 5, obtained: 5 },
            { type: "Final", total: 50, obtained: 0 }
        ]
    },
    "Technology": {
        logic: "fixed",
        assessments: [
            { type: "Midterm 1", total: 20, obtained: 20 },
            { type: "Midterm 2", total: 20, obtained: 18 },
            { type: "Quiz 1", total: 5, obtained: 5 },
            { type: "Quiz 2", total: 5, obtained: 3 },
            { type: "Quiz 3", total: 5, obtained: 4 },
            { type: "Final", total: 50, obtained: 0 }
        ]
    },
    "Administration": {
        logic: "fixed",
        assessments: [
            { type: "Midterm 1", total: 20, obtained: 20 },
            { type: "Midterm 2", total: 20, obtained: 17 },
            { type: "Report", total: 10, obtained: 10 },
            { type: "Final", total: 50, obtained: 0 }
        ]
    },
    "Islamic": {
        logic: "fixed",
        assessments: [
            { type: "Midterm", total: 20, obtained: 17 },
            { type: "Performance tasks", total: 20, obtained: 20 },
            { type: "Final", total: 60, obtained: 0 }
        ]
    },
    "Arabica": {
        logic: "fixed",
        assessments: [
            { type: "Midterm", total: 20, obtained: 19 },
            { type: "Various activities", total: 20, obtained: 20 },
            { type: "Final", total: 60, obtained: 0 }
        ]
    }
};

// كود الحفظ والتحميل من المتصفح
if (!localStorage.getItem('myGrades')) {
    localStorage.setItem('myGrades', JSON.stringify(initialData));
}

function loadData() {
    return JSON.parse(localStorage.getItem('myGrades'));
}

// دالة عرض القائمة الجانبية
function buildMenu() {
    const data = loadData();
    const menu = document.getElementById('subjectsMenu');
    menu.innerHTML = '';
    Object.keys(data).forEach(s => {
        const li = document.createElement('li');
        li.innerText = s;
        li.onclick = () => showSubject(s);
        menu.appendChild(li);
    });
}

// تشغيل عند التحميل
window.onload = () => {
    buildMenu();
    showDashboard(); 
};
