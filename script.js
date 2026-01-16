// بيانات المقررات المدخلة
const initialData = {
    "Economy": {
        logic: "best_4_of_5",
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
    }
    // يمكنك إضافة بقية المواد هنا بنفس التنسيق
};

// حفظ البيانات في LocalStorage عند أول تشغيل
if (!localStorage.getItem('myGrades')) {
    localStorage.setItem('myGrades', JSON.stringify(initialData));
}

function loadData() {
    return JSON.parse(localStorage.getItem('myGrades'));
}

function showDashboard() {
    const main = document.getElementById('mainArea');
    main.innerHTML = <h1>Dashboard 2026</h1><p>اختر مقرر من القائمة الجانبية لرؤية التفاصيل.</p>;
}

function showSubject(subjectName) {
    const data = loadData()[subjectName];
    const main = document.getElementById('mainArea');
    
    let rowsHtml = '';
    
    // منطق الاقتصاد (استبعاد الأقل)
    let quizGrades = data.assessments.filter(a => a.type.includes("Quiz"));
    let minQuiz = quizGrades.reduce((prev, curr) => (prev.obtained < curr.obtained) ? prev : curr);

    data.assessments.forEach(item => {
        let isExcluded = (data.logic === "best_4_of_5" && item === minQuiz);
        rowsHtml += `
            <tr class="${isExcluded ? 'excluded-row' : ''}">
                <td>${item.type}</td>
                <td>${item.total}</td>
                <td>${item.obtained}</td>
            </tr>
        `;
    });

    main.innerHTML = `
        <button class="back-btn" onclick="showDashboard()">← Back to Dashboard</button>
        <h2>مقرر: ${subjectName}</h2>
        <table>
            <thead>
                <tr>
                    <th>Assessment Type</th>
                    <th>Total Grade</th>
                    <th>Grade Obtained</th>
                </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
        </table>
    `;
}

// بناء القائمة الجانبية
const subjects = Object.keys(loadData());
const menu = document.getElementById('subjectsMenu');
subjects.forEach(s => {
    const li = document.createElement('li');
    li.innerText = s;
    li.onclick = () => showSubject(s);
    menu.appendChild(li);
});

// تشغيل الداشبورد افتراضياً
showDashboard();
