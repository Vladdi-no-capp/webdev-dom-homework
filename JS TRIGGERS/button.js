export const initCommentActions = (comments, placeholderText) => {
    comments.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-button')

        if (likeButton) {
            event.stopPropagation()

            const counter = likeButton.previousElementSibling
            const currentCount = Number(counter.textContent)
            const isLiked = likeButton.classList.toggle('-active-like')

            counter.textContent = isLiked ? currentCount + 1 : currentCount - 1

            return
        }

        const comment = event.target.closest('.comment')

        if (!comment) {
            return
        }

        const author = comment
            .querySelector('.comment-author')
            .textContent.trim()
        const text = comment.querySelector('.comment-text').textContent.trim()

        placeholderText.value = `> ${author}: ${text}\n\n`
        placeholderText.focus()
    })
}
