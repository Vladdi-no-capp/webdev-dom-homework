import { initCommentActions } from './JS TRIGGERS/button.js'
import { postComment } from './comments.js'
import { fetchRenderComments } from './fetchAndRenderComments.js'

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
    button.disabled = true

    postComment(newComment)
        .then(() => {
            return fetchRenderComments(comments)
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

fetchRenderComments(comments).catch((error) => {
    console.error('Не удалось загрузить комментарии:', error)
})
