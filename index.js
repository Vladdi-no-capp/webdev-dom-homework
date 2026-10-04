import { initCommentActions } from './JS TRIGGERS/button.js'
import { getComments, postComment } from './api.js'
import { commentsFor, updateComments } from './comments.js'
import { renderComments } from './JS TRIGGERS/function.js'

const button = document.querySelector('.add-form-button')
const placeholderText = document.querySelector('.add-form-text')
const placeholderName = document.querySelector('.add-form-name')
const comments = document.querySelector('.comments')
const addForm = document.querySelector('.add-form')
const addFormLoading = document.querySelector('.add-form-loading')

button.addEventListener('click', () => {
    const newComment = {
        name: placeholderName.value.trim(),
        text: placeholderText.value.trim(),
    }

    if (newComment.name === '' || newComment.text === '') {
        return
    }

    button.disabled = true
    addForm.hidden = true
    addFormLoading.hidden = false

    postComment(newComment)
        .then(() => getComments())
        .then((data) => {
            updateComments(data.comments)
            renderComments(comments, commentsFor)
        })
        .then(() => {
            placeholderName.value = ''
            placeholderText.value = ''
        })
        .catch((error) => {
            console.error('Ошибка:', error)
        })
        .finally(() => {
            addForm.hidden = false
            addFormLoading.hidden = true
            button.disabled = false
        })
})

initCommentActions(comments, placeholderText)

comments.innerHTML = `
    <li class="comment comments-loading">
        Комментарии загружаются...
    </li>`

getComments()
    .then((data) => {
        updateComments(data.comments)
        renderComments(comments, commentsFor)
    })
    .catch((error) => {
        console.error('Не удалось загрузить комментарии:', error)
    })
