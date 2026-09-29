import { getComments } from './api.js'
import { renderComments } from './JS TRIGGERS/function.js'
import { commentsFor, updateComments } from './comments.js'

export const fetchRenderComments = (commentsElement) => {
    return getComments().then((data) => {
        const loadedComments = data.comments

        updateComments(loadedComments)
        renderComments(commentsElement, commentsFor)
    })
}
