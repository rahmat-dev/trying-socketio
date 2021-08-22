import React from 'react';

const CommentCard = ({ comment }) => (
  <div className="p-4 mt-4 shadow-md">
    <p className="text-sm font-semibold text-gray-500">{comment?.sender}</p>
    <p className="text-gray-800 font-medium text-lg">{comment?.message}</p>
  </div>
);

export default CommentCard;
