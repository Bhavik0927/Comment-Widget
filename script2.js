document.addEventListener('DOMContentLoaded', function() {
    const commentList = document.getElementById('comment-list');
    const commentInput = document.getElementById('comment-input');
    const submitCommentButton = document.getElementById('submit-comment');

    function createCommentElement(text, parentElement = null) { 
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = text;

        const replyButton = document.createElement('span');
        replyButton.className = 'reply-btn';
        replyButton.textContent = 'Reply';
        replyButton.addEventListener('click', function() {
            const replyInput = document.createElement('textarea');
            replyInput.className = 'reply-input';
            replyInput.placeholder = 'Write a reply...';
            const submitReplyButton = document.createElement('button');
            submitReplyButton.textContent = 'Submit';

            submitReplyButton.addEventListener('click', function() {
                const replyText = replyInput.value.trim();
                if (replyText !== '') {
                    const nestedComment = createCommentElement(replyText, commentElement);
                    commentElement.appendChild(nestedComment);
                    commentElement.removeChild(replyInput);
                    commentElement.removeChild(submitReplyButton);
                }
            });

            commentElement.appendChild(replyInput);
            commentElement.appendChild(submitReplyButton);
        });

        const editButton = document.createElement('span');
        editButton.className = 'edit-btn';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            const editInput = document.createElement('textarea');
            editInput.className = 'reply-input';
            editInput.value = commentElement.firstChild.textContent;

            const submitEditButton = document.createElement('button');
            submitEditButton.textContent = 'Save';

            submitEditButton.addEventListener('click', function() {
                const newText = editInput.value.trim();
                if (newText !== '') {
                    commentElement.firstChild.textContent = newText;
                    commentElement.removeChild(editInput);
                    commentElement.removeChild(submitEditButton);
                }
            });

            commentElement.appendChild(editInput);
            commentElement.appendChild(submitEditButton);
        });

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            if (parentElement) {
                parentElement.removeChild(commentElement);
            } else {
                commentList.removeChild(commentElement);
            }
        });

        commentElement.appendChild(replyButton);
        commentElement.appendChild(editButton);
        commentElement.appendChild(deleteButton);

        return commentElement;
    }

    submitCommentButton.addEventListener('click', function() {
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            const commentElement = createCommentElement(commentText);
            commentList.appendChild(commentElement);
            commentInput.value = '';
        }
    });
});
