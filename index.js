import { initCommentActions } from './JS TRIGGERS/button.js'
import { renderComments } from './JS TRIGGERS/function.js'
import { commentsFor, updateComments } from './comments.js'
import { renderLoginComponent } from './login-component.js'
import { getComments, loginUser, postComment } from './api.js'

let user = null

const button = document.querySelector('.add-form-button')
export const placeholderText = document.querySelector('.add-form-text')
export const placeholderName = document.querySelector('.add-form-name')
const comments = document.querySelector('.comments')
const addForm = document.querySelector('.add-form')
const loginLink = document.querySelector('.login-link')
const addFormLoading = document.querySelector('.add-form-loading')
const loginMessage = document.querySelector('.login-message')
const loginPage = document.querySelector('.login-page')

loginLink.addEventListener('click', () => {
    comments.hidden = true
    loginMessage.hidden = true

    renderLoginComponent({
        loginPage,
        onLogin: ({ login, password }) => {
            loginUser({ login, password })
                .then((data) => {
                    user = data.user
                    loginPage.hidden = true
                    comments.hidden = false
                    addForm.hidden = false

                    placeholderName.value = user.name
                    placeholderName.readOnly = true
                })
                .catch((error) => {
                    if (error.message === 'WRONG_LOGIN_OR_PASSWORD') {
                        alert('Неверный логин или пароль')
                        return
                    }

                    alert('Не удалось выполнить вход')
                })
        },
    })
})

button.addEventListener('click', () => {
    const text = placeholderText.value.trim()

    if (text.length < 3) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        return
    }

    button.disabled = true
    addForm.hidden = true
    addFormLoading.hidden = false

    postComment({
        text,
        token: user.token,
    })
        .then(() => getComments())
        .then((loadedComments) => {
            updateComments(loadedComments)
            renderComments(comments, commentsFor)
        })
        .then(() => {
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

getComments()
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
