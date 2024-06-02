// Define a dictionary to store the data
var gradeData = {};

// Function to create input fields for classes
function createInputFields() {
    var idNumber = document.getElementById('idNumber').value.trim();

    // Check if ID number is filled
    if (idNumber === "") {
        alert("Please fill in the ID number first.");
        return;
    }

    var numClasses = parseInt(document.getElementById('numClasses').value);
    var classInputsDiv = document.getElementById('classInputs');
    classInputsDiv.innerHTML = '';

    // Array to store classes for this grade
    var classes = [];

    for (var i = 1; i <= numClasses; i++) {
        var className = document.getElementById('class' + i).value.trim();
        var grade = document.getElementById('grade' + i).value.trim().toUpperCase();

        // Store class in the classes array
        classes.push({ name: className, grade: grade });
    }

    // Store GPA, ID number, grade, and classes for this grade in the dictionary (SAVING)
    gradeData[idNumber] = {
        grade: grade,
        classes: classes
    };
}
// Function to create input fields for classes
function createInputFields() {
    var numClasses = parseInt(document.getElementById('numClasses').value);
    var classInputsDiv = document.getElementById('classInputs');
    classInputsDiv.innerHTML = '';


    for (var i = 1; i <= numClasses; i++) {
        var div = document.createElement('div');
        div.className = 'mb-4';
        div.innerHTML = '<label for="class' + i + '" class="block font-medium text-blue">Class ' + i + ':</label>' +
            '<input type="text" id="class' + i + '" placeholder="Class Name" required class="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0">' +
            '<label for="grade' + i + '" class="block font-medium text-blue">Grade:</label>' +
            '<select id="grade' + i + '" class="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-500 focus:bg-blue focus:ring-0">' +
            '<option value="A+">A+</option>' +
            '<option value="A">A</option>' +
            '<option value="A-">A-</option>' +
            '<option value="B+">B+</option>' +
            '<option value="B">B</option>' +
            '<option value="B-">B-</option>' +
            '<option value="C+">C+</option>' +
            '<option value="C">C</option>' +
            '<option value="C-">C-</option>' +
            '<option value="D+">D+</option>' +
            '<option value="D">D</option>' +
            '<option value="D-">D-</option>' +
            '<option value="F">F</option>' +
            '</select>' +
            '<label for="type' + i + '" class="block font-medium text-blue">Course Type:</label>' +
            '<select id="type' + i + '" class="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-500 focus:bg-blue focus:ring-0">' +
            '<option value="regular">Regular</option>' +
            '<option value="AP">AP</option>' +
            '</select>';
        classInputsDiv.appendChild(div);
    }
}


//Calculates UnweightedGPA (DOES NOT take into consideration AP)
function calculateUnweightedGPA(numClasses) {
    var totalGradePoints = 0;

    for (var i = 1; i <= numClasses; i++) {
        var grade = document.getElementById('grade' + i).value.trim().toUpperCase();

        var gradePoints;

        switch (grade) {
            case 'A+':
            case 'A':
            case 'A-':
                gradePoints = 4.0;
                break;
            case 'B+':
            case 'B':
            case 'B-':
                gradePoints = 3.0;
                break;
            case 'C+':
            case 'C':
            case 'C-':
                gradePoints = 2.0;
                break;
            case 'D+':
            case 'D':
            case 'D-':
                gradePoints = 1.0;
                break;
            case 'F':
                gradePoints = 0;
                break;
            default:
                alert('Invalid grade entered for class ' + i);
                return;
        }

        totalGradePoints += gradePoints;
    }

    var unweightedGPA = totalGradePoints / numClasses;
    return unweightedGPA;
}

//Calculates WeightedGPA (takes into consideration AP)
function calculateWeightedGPA(numClasses) {
    var totalCredits = 0;
    var totalWeightedGradePoints = 0;

    for (var i = 1; i <= numClasses; i++) {
        var grade = document.getElementById('grade' + i).value.trim().toUpperCase();
        var type = document.getElementById('type' + i).value;

        var gradePoints;

        switch (grade) {
            case 'A+':
            case 'A':
            case 'A-':
                gradePoints = 4.0;
                break;
            case 'B+':
            case 'B':
            case 'B-':
                gradePoints = 3.0;
                break;
            case 'C+':
            case 'C':
            case 'C-':
                gradePoints = 2.0;
                break;
            case 'D+':
            case 'D':
            case 'D-':
                gradePoints = 1.0;
                break;
            case 'F':
                gradePoints = 0;
                break;
            default:
                alert('Invalid grade entered for class ' + i);
                return;
        }

        if (type === 'AP') {
            gradePoints += 1;
        }
        // According to Silver Creek High School, Each class has 5 credits
        totalCredits += 5; 
        totalWeightedGradePoints += gradePoints * 5; // Multiply by the credits for weighted GPA
    }
    // WeightedGPA = (WeightedPoints (ie: A:5)/(TotalCredits:5))))
    var weightedGPA = totalWeightedGradePoints / totalCredits;
    return weightedGPA;
}

//Prints the GPA and Provides the Option to save the GPA, Only after the GPA is displayes
function calculateGPA() {
    var numClasses = parseInt(document.getElementById('numClasses').value);

    var unweightedGPA = calculateUnweightedGPA(numClasses);
    var weightedGPA = calculateWeightedGPA(numClasses);

    document.getElementById('result').innerHTML = 'Your Unweighted GPA is: ' + unweightedGPA.toFixed(2) +
        '<br>Your Weighted GPA is: ' + weightedGPA.toFixed(2);

    //Save GPA button
    document.getElementById('saveGpaBtn').classList.remove('hidden');
}

//Provides the Option to SaveGPA (OPTIONAL)
function saveGpa() {
    alert('GPA saved!');
}

//Opens Instructions Page
function openInstructions() {
    window.location.href = "instructions.html"; 
}

//Drop Down Menu
function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}

//Opens Question Page
  function openQA() {
      window.location.href = "qa.html"; 
  }

function redirectToHome() {
  var studentID = document.getElementById("studentID").value.trim();
  if (studentID !== "") {
    // Redirect only if the studentID field is not empty
    window.location.href = "home.html";
  } else {
    // Display a message to fill out the form
    alert("Please fill out with your Student ID.");
  }
}
