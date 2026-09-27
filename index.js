import { initCommentActions } from './JS TRIGGERS/button.js'
import { renderComments } from './JS TRIGGERS/function.js'
import { getComments, personalKey } from './comments.js'

const button = document.querySelector('.add-form-button')
const placeholderText = document.querySelector('.add-form-text')
const placeholderName = document.querySelector('.add-form-name')
const comments = document.querySelector('.comments')

const loadAndRenderComments = () => {
    return getComments().then((loadedComments) => {
        renderComments(comments, loadedComments)
    })
}

button.addEventListener('click', () => {
    const newComment = {
        name: placeholderName.value.trim(),
        text: placeholderText.value.trim(),
    }

    if (newComment.name === '' || newComment.text === '') {
        return
    }

    button.disabled = true

    fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.error) {
                throw new Error(data.error)
            }

            return loadAndRenderComments()
        })
        .then(() => {
            placeholderName.value = ''
            placeholderText.value = ''
        })
        .catch((error) => {
            console.error('Ошибка:', error)
        })
        .finally(() => {
            button.disabled = false
        })
})

initCommentActions(comments, placeholderText)

loadAndRenderComments().catch((error) => {
    console.error('Не удалось загрузить комментарии:', error)
})
