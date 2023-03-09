let section_1_scroll = document.getElementById('section_1_nav')
let section_2_scroll = document.getElementById('section_2_nav')
let section_3_scroll = document.getElementById('section_3_nav')

section_1_scroll.addEventListener("click", async function () {
    section_1.scrollIntoView()
})

section_2_scroll.addEventListener("click", async function () {
    section_2.scrollIntoView()
})

section_3_scroll.addEventListener("click", async function () {
    section_3.scrollIntoView()
})