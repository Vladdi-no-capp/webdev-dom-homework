import { initAddComment } from './add-comment.js'
import { getComments } from './api.js'
import { commentsFor, updateComments } from './comments.js'
import { initCommentActions } from './JS TRIGGERS/button.js'
import { renderComments } from './JS TRIGGERS/function.js'

const loadComments = () => {
    const comments = document.querySelector('.comments')

    comments.innerHTML = `
        <li class="comment comments-loading">
            Комментарии загружаются...
        </li>`

    return getComments()
        .then((loadedComments) => {
            updateComments(loadedComments)
            renderComments(comments, commentsFor)
        })
        .catch((error) => {
            if (error.message === 'SERVER_ERROR') {
                alert('Сервер сломался, попробуй позже')
                return
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже')
        })
}

const initApp = () => {
    const comments = document.querySelector('.comments')
    const placeholderText = document.querySelector('.add-form-text')

    initCommentActions(comments, placeholderText)
    initAddComment()
    loadComments()
}

initApp()
