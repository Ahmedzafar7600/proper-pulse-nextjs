

import React from 'react';
import connectDB from "@/config/database";
import Property from "@/models/Property"; // ✅ ACTUALLY import the model
import Message from "@/models/Message"; // ✅ Import Message model
import { convertToSerializableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import MessageCard from '@/components/MessageCard';

async function MessagesPage() {
  await connectDB();
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.userId;

  if (!userId) {
    return (
      <section className="bg-blue-50 py-10 px-6">
        <div className="container m-auto py-24 max-w-6xl px-6">
          <div className="bg-white px-6 py-8 mb-6 rounded-md shadow-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
            <p className="text-red-500">User not authenticated.</p>
          </div>
        </div>
      </section>
    );
  }

  const readMessages = await Message.find({ receipient: userId, read: true })
  .sort({ createdAt: -1 })
  .populate('sender', '_id userName') // include both _id and username
  .populate('property', 'name')
  .lean();

const unreadMessages = await Message.find({ receipient: userId, read: false })
  .sort({ createdAt: -1 })
  .populate('sender', '_id userName') // same here
  .populate('property', 'name')
  .lean();

  const messages = [...unreadMessages, ...readMessages].map(messageDoc => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = message.sender ? convertToSerializableObject(message.sender) : null;
    message.property = message.property ? convertToSerializableObject(message.property) : null;
    return message;
  });

  return (
    <section className="bg-blue-50 py-10 px-6">
      <div className="container m-auto py-24 max-w-6xl px-6">
        <div className="bg-white px-6 py-8 mb-6 rounded-md shadow-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message) => {
                return <MessageCard key={message._id} message={message} />;
              })
            ) : (
              <p className="text-gray-500">No messages found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesPage;
