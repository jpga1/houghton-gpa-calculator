const calculateButton = document.querySelector('.calculate-button')

calculateButton.addEventListener('click', () => {
    const creditsEarned = document.querySelectorAll('#credits-earned')
    let totalCredits = 0

    creditsEarned.forEach(credit => {
        totalCredits += Number(credit.value)
    })

    console.log(totalCredits)
})