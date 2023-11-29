// Make a reference to the calculate button
const calculateButton = document.querySelector('.calculate-button')


calculateButton.addEventListener('click', () => {
    // Calculate the current semester credits
    const creditsEarned = document.querySelectorAll('#credits-earned')
    let totalCredits = 0

    creditsEarned.forEach(credit => {
        totalCredits += Number(credit.value)
    })

    console.log("a: " + totalCredits)

    // Calculate the weighted sum
    const expectedGrades = document.querySelectorAll('#expected-grade')
    let weightedSum = 0

    // TODO: Figure out how to extract the values of credits earned and expected grades in order to calculate the weighted sum
    expectedGrades.forEach(grade => {
        console.log(grade.value)
    })

    // (creditsEarned, expectedGrades).forEach((credit, grade) => {
    //     weightedSum += Number(credit.value) * Number(grade.value)
    // })

    // console.log("b: " + weightedSum)
})