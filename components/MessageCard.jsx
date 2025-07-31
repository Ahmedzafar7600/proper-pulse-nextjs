'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import React from 'react';
import  { useGlobalContext } from '@/context/GlobalContext';

function MessageCard({ message }) {

    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);
    const { setUnReadCount } = useGlobalContext();

    const handleMarkAsRead = async () => {
        try {
           const response =await markMessageAsRead(message._id);
            setIsRead(response.isMessageRead);
            setUnReadCount(prevCount => response.isMessageRead ? prevCount - 1 : prevCount + 1);
            // Show success toast
            toast.success(response.isMessageRead ? 'Message marked as read' : 'Message marked as new');
           
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const handleDeleteMessage = async () => {
        try {
            await deleteMessage(message._id);
            setIsDeleted(true);
            setUnReadCount(prevCount => response.isMessageRead ? prevCount  : prevCount - 1);
            toast.success('Message deleted successfully');
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };
    if (isDeleted) return <p>Message deleted</p>; // Don't render the card if it's deleted

  return (
    <div className={`p-4 border rounded-md shadow-sm ${isRead ? 'bg-gray-100' : 'bg-white'}`}>
        {isRead ? <span className="text-green-500 font-semibold ">Read</span> : <span className="text-red-500">New</span>}
      <h3 className="text-xl font-semibold">
        Property Inquiry:
        {message.property?.name || "Property"}
      </h3>
      <p className="text-gray-600">{message.body}</p>
      <ul className="list-disc pl-5">
        <li><strong>From:</strong> {message.name}
          <strong>  Reply Email:</strong>{''}
          <a href={`mailto:${message.email}`} className="text-blue-500">{message.email}</a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{''}
          <a href={`tel:${message.phone}`} className="text-blue-500">{message.phone}</a>
        </li>
        <li>
          <strong>Received:</strong>{''}
            {new Date(message.createdAt).toLocaleDateString()}
        </li>
      </ul>
      <button onClick={handleMarkAsRead} className="mt-4 mr-3 bg-blue-500 text-white px-3 py-1 rounded">
       { isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      
      <button onClick={handleDeleteMessage} className="mt-4 bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  );
}

export default MessageCard;
