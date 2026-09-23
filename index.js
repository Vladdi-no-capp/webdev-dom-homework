import { initCommentActions } from './JS TRIGGERS/button.js'
import { addComment } from './JS TRIGGERS/function.js'

const button = document.querySelector('.add-form-button')
const placeholderText = document.querySelector('.add-form-text')
const placeholderName = document.querySelector('.add-form-name')
const comments = document.querySelector('.comments')

button.addEventListener('click', () => {
    addComment(comments, placeholderName, placeholderText)
})

initCommentActions(comments, placeholderText)
