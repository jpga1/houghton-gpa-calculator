// Make a reference to the calculate button
const calculateButton = document.querySelector('.calculate-button')


calculateButton.addEventListener('click', () => {
    // Calculate the current semester credits
    const creditsEarned = document.querySelectorAll('#credits-earned')
    let totalCredits = calculateCurrentSemesterCredits(creditsEarned)

    // Calculate the weighted sum
    const expectedGrades = document.querySelectorAll('#expected-grade')
    let weightedSum = calculateWeightedSum(expectedGrades, creditsEarned)

    // Calculate current semester gpa and overall gpa
    // console.log("current semester gpa: " + calculateCurrentSemesterGPA(weightedSum, totalCredits))

    console.log("overall gpa: " + (calculateOverallGPA(weightedSum,
        document.querySelector('#previous-cumulative-gpa').value,
        document.querySelector('#previous-cumulative-credits-earned').value,
        totalCredits)).toFixed(2))

    // TODO: Optimize code
    // TODO: Output results to page
})

function calculateCurrentSemesterCredits(creditsEarned){
    let totalCredits = 0

    creditsEarned.forEach(credit => {
        totalCredits += Number(credit.value)
    })

    return totalCredits
}

function calculateWeightedSum(expectedGrades, creditsEarned){
    let weightedSum = 0

    const expectedGradesArray = []

    expectedGrades.forEach(grade => {
        expectedGradesArray.push(grade.value)
    })

    const creditsEarnedArray = []

    creditsEarned.forEach(credit => {
        creditsEarnedArray.push(credit.value)
    })

    let creditsEarnedAndExpectedGradeProductArray = expectedGradesArray.map((value, index) => {
        return value * creditsEarnedArray[index]
    })

    creditsEarnedAndExpectedGradeProductArray.forEach(value => {
        weightedSum += value
    })

    return weightedSum
}

function calculateCurrentSemesterGPA(weightedSum, totalCredits){
    return weightedSum/totalCredits
}

function calculateOverallGPA(weightedSum, previousCumulativeGPA, previousCumulativeCredits, totalCredits){
    return (weightedSum + (previousCumulativeGPA * previousCumulativeCredits))/
    (totalCredits + Number(previousCumulativeCredits))
}