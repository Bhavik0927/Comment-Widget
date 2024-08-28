document.addEventListener('DOMContentLoaded',() =>{
    const commentInput = document.getElementById('comment-input');
    const submitButton = document.getElementById('submit-comment');
    const commentLists = document.getElementById('comment-list');

    const createCommentElement = (text,parentElement = null) =>{
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = text;

        const replyButton = document.createElement('span');
        replyButton.className = 'reply-btn';
        replyButton.textContent = "Reply";
        replyButton.addEventListener('click',()=>{
            const replayArea = document.createElement('textarea');
            replayArea.className = 'reply-input';
            replayArea.placeholder = 'Write a reply...';
            const replaySubmit = document.createElement('button');
            replaySubmit.textContent = 'Submit';

            replaySubmit.addEventListener('click',() =>{
                const replayText = replayArea.value.trim();
                if(replayText !== ''){
                    const nastedComment = createCommentElement(replayText,commentElement);
                    commentElement.appendChild(nastedComment);
                    commentElement.removeChild(replayArea);
                    commentElement.removeChild(replaySubmit);
                }
            })


            commentElement.appendChild(replayArea);
            commentElement.appendChild(replaySubmit);
        })

        const editButton = document.createElement('span');
        editButton.textContent = "Edit";
        editButton.className = 'edit-btn';
        editButton.addEventListener('click',() =>{
            const editInput = document.createElement('textarea');
            editInput.className = 'reply-input';
            editInput.textContent = commentElement.firstChild.textContent;

            const submitEditButton = document.createElement('button');
            submitEditButton.textContent = "Save";

            submitEditButton.addEventListener('click',() =>{
                const newText = editInput.value.trim();
                if(newText !== ''){
                    commentElement.firstChild.textContent = newText;
                    commentElement.removeChild(editInput);
                    commentElement.removeChild(submitEditButton)
                }
            })
            commentElement.appendChild(editInput);
            commentElement.appendChild(submitEditButton);
        })

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.className = 'delete-btn';

        deleteButton.addEventListener('click',() =>{
            if(parentElement){
                commentElement.removeChild(parentElement);
            }else{
                commentLists.removeChild(parentElement);
            }
        })

        commentElement.appendChild(replyButton);
        commentElement.appendChild(editButton);
        commentElement.appendChild(deleteButton);
        
        return commentElement;
    }

    submitButton.addEventListener('click',() =>{
        const commnetContent = commentInput.value.trim();
        if(commnetContent !== ''){
            const commentElement = createCommentElement(commnetContent);
            commentLists.appendChild(commentElement);
            commentInput.value = '';
        } 
    })
})