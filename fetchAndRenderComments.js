import { renderComments } from './JS TRIGGERS/function.js'
import { getComments } from './comments.js'

export const fetchRenderComments = (commentsElement) => {
    return getComments().then((loadedComments) => {
        renderComments(commentsElement, loadedComments)
    })
}
