// Make a reference to the calculate button
const calculateButton = document.querySelector('.calculate-button')


calculateButton.addEventListener('click', () => {
    // Calculate the current semester credits
    const creditsEarned = document.querySelectorAll('#credits-earned')
    let totalCredits = 0

    creditsEarned.forEach(credit => {
        totalCredits += Number(credit.value)
    })

    console.log("current semester credits: " + totalCredits)

    // Calculate the weighted sum
    const expectedGrades = document.querySelectorAll('#expected-grade')
    let weightedSum = 0

    const expectedGradesArray = []

    expectedGrades.forEach(grade => {
        expectedGradesArray.push(grade.value)
    })

    const creditsEarnedArray = []

    creditsEarned.forEach(credit => {
        creditsEarnedArray.push(credit.value)
    })

    let foo = expectedGradesArray.map((value, index) => {
        return value * creditsEarnedArray[index]
    })

    foo.forEach(value => {
        weightedSum += value
    })

    console.log("weighted sum: " + weightedSum)

    // Calculate current semester gpa and overall gpa
    console.log("current semester gpa: " + (weightedSum/totalCredits))

    const previousCumulativeGPA = document.querySelector('#previous-cumulative-gpa').value
    const previousCumulativeCredits = document.querySelector('#previous-cumulative-credits-earned').value

    console.log('previous cumulative gpa: ' + previousCumulativeGPA)
    console.log('previous cumulative credits: ' + previousCumulativeCredits)

    // console.log('b + c * d = ' + (weightedSum + (previousCumulativeGPA * previousCumulativeCredits)))
    // console.log('a + d = ' + (totalCredits + previousCumulativeCredits))
    // console.log(typeof previousCumulativeCredits)

    console.log("overall gpa: " + ((weightedSum + (previousCumulativeGPA * previousCumulativeCredits))/(totalCredits + Number(previousCumulativeCredits))))

    // TODO: Optimize code and properly output results
})