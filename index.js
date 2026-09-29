import { initCommentActions } from './JS TRIGGERS/button.js'
import { postComment } from './comments.js'
import { fetchRenderComments } from './fetchAndRenderComments.js'

const button = document.querySelector('.add-form-button')
export const placeholderText = document.querySelector('.add-form-text')
export const placeholderName = document.querySelector('.add-form-name')
const comments = document.querySelector('.comments')
const addForm = document.querySelector('.add-form')
const addFormLoading = document.querySelector('.add-form-loading')

button.addEventListener('click', () => {
    const newComment = {
        name: placeholderName.value.trim(),
        text: placeholderText.value.trim(),
        forceError: true,
    }

    if (newComment.name.length < 3 || newComment.text.length < 3) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        return
    }

    button.disabled = true
    addForm.hidden = true
    addFormLoading.hidden = false

    postComment(newComment)
        .then(() => {
            return fetchRenderComments(comments)
        })
        .then(() => {
            placeholderName.value = ''
            placeholderText.value = ''
        })
        .catch((error) => {
            if (error.message === 'SERVER_ERROR') {
                alert('Сервер сломался, попробуй позже')
                return
            }

            if (error.message === 'VALIDATION_ERROR') {
                alert('Имя и комментарий должны быть не короче 3 символов')
                return
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже')
        })
        .finally(() => {
            addForm.hidden = false
            addFormLoading.hidden = true
            button.disabled = false
            button.textContent = 'Добавить'
        })
})

initCommentActions(comments, placeholderText)

comments.innerHTML = `
    <li class="comment comments-loading">
        Комментарии загружаются...
    </li>`

fetchRenderComments(comments).catch((error) => {
    if (error.message === 'SERVER_ERROR') {
        alert('Сервер сломался, попробуй позже')
        return
    }

    alert('Кажется, у вас сломался интернет, попробуйте позже')
})
