// Make a reference to the calculate and add row buttons
const calculateButton = document.querySelector('.calculate-button')
const addRowButton = document.querySelector('.add-row-button')


calculateButton.addEventListener('click', () => {
    // Calculate the total semester credits
    const creditsEarned = document.querySelectorAll('#credits-earned')
    let totalCredits = calculateTotalSemesterCredits(creditsEarned)

    // Calculate the weighted sum
    let weightedSum = calculateWeightedSum(document.querySelectorAll('#expected-grade'), creditsEarned)

    // Calculate current semester gpa and overall gpa
    const currentSemesterGPA = calculateCurrentSemesterGPA(weightedSum, totalCredits).toFixed(3)
    const overallGPA = calculateOverallGPA(weightedSum,
        Number(document.querySelector('#previous-cumulative-gpa').value),
        Number(document.querySelector('#previous-cumulative-credits-earned').value),
        totalCredits).toFixed(3)
    
    outputResultsToDocument(currentSemesterGPA, overallGPA)
})

addRowButton.addEventListener('click', () => {
    const courseCreditsAndExpectedGrade = document.querySelector('.course-credits-and-expected-grade')
    const newRow = makeNewRow()

    // Add row items into the sub-container
    newRow.forEach(rowItem => {
        courseCreditsAndExpectedGrade.append(rowItem)
    })
})

function outputResultsToDocument(currentSemesterGPA, overallGPA){
    const container = document.querySelector('.container')
    
    // Remove previous results
    clearPreviousOutput(container)

    // Prepare string
    const currentSemesterGPAOutput = document.createElement('span')
    const overallGPAOutput = document.createElement('span')

    currentSemesterGPAOutput.classList.add('result')
    overallGPAOutput.classList.add('result')

    currentSemesterGPAOutput.innerText = 'Current GPA: ' + currentSemesterGPA
    overallGPAOutput.innerText = 'Overall GPA: ' + overallGPA

    // Style
    currentSemesterGPAOutput.style.color = 'white'
    overallGPAOutput.style.color = 'white'

    currentSemesterGPAOutput.style.fontSize = '24px'
    overallGPAOutput.style.fontSize = '24px'

    // Add to document
    container.append(currentSemesterGPAOutput)
    container.append(overallGPAOutput)
}

function clearPreviousOutput(container){

    const results = container.querySelectorAll('.result')
    
    results.forEach(results => {
        container.removeChild(results)
    })
}

function makeNewRow(){
    // New course title input field
    const courseTitleInput = document.createElement('input')
    courseTitleInput.type = 'text'
    courseTitleInput.name = 'course-title'

    // New course credit input field
    const courseCreditInput = document.createElement('input')
    courseCreditInput.type = 'number'
    courseCreditInput.name = 'credits-earned'
    courseCreditInput.id = 'credits-earned'
    courseCreditInput.min = '1'

    // New expected grade input field
    const expectedGradeInput = document.createElement('select')
    expectedGradeInput.name = 'expected-grade'
    expectedGradeInput.id = 'expected-grade'

    const expectedGradeInputDefaultOption = document.createElement('option')
    expectedGradeInputDefaultOption.selected = true

    expectedGradeInput.append(expectedGradeInputDefaultOption, makeNewOption(4.0, 'A'),
        makeNewOption(3.67, 'A-'), makeNewOption(3.33, 'B+'), makeNewOption(3.0, 'B'),
        makeNewOption(2.67, 'B-'), makeNewOption(2.33, 'C+'), makeNewOption(2.0, 'C'),
        makeNewOption(1.67, 'C-'), makeNewOption(1.33, 'D+'), makeNewOption(1.0, 'D'),
        makeNewOption(0.67, 'D-'), makeNewOption(0, 'F'))

    return [courseTitleInput, courseCreditInput, expectedGradeInput]
}

// Make a new option for select inputs
function makeNewOption(value, text){
    const newOption = document.createElement('option')
    newOption.value = value
    newOption.innerText = text

    return newOption
}

function calculateTotalSemesterCredits(creditsEarned){
    let totalCredits = 0

    creditsEarned.forEach(credit => {
        totalCredits += Number(credit.value)
    })

    return totalCredits
}

function calculateWeightedSum(expectedGrades, creditsEarned){
    let weightedSum = 0

    const expectedGradesArray = [...expectedGrades].map(grade => {return grade.value}).filter(grade => grade !== '')
    const creditsEarnedArray = [...creditsEarned].map(credit => {return credit.value}).filter(credit => credit !== '')

    // Weighted sum calculation
    expectedGradesArray.map((value, index) => {
        return Number(value) * Number(creditsEarnedArray[index])
    }).forEach(value => {
        weightedSum += value
    })

    return weightedSum
}

function calculateCurrentSemesterGPA(weightedSum, totalCredits){
    return weightedSum/totalCredits
}

function calculateOverallGPA(weightedSum, previousCumulativeGPA, previousCumulativeCredits, totalCredits){
    return (weightedSum + (previousCumulativeGPA * previousCumulativeCredits))/(totalCredits + previousCumulativeCredits)
}