import { getComments, postComment } from './api.js'
import { commentsFor, updateComments } from './comments.js'
import { renderComments } from './JS TRIGGERS/function.js'

export const initAddComment = () => {
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
            .then(() => getComments())
            .then((loadedComments) => {
                updateComments(loadedComments)
                renderComments(comments, commentsFor)
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
}
