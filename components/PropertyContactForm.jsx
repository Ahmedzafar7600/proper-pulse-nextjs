'use client';
import { useEffect } from "react";
import { useFormState } from "react-dom";
import addMessage from "@/app/actions/addMessage";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import SubmittedMessageButton from "./SubmittedMessageButton";

function PropertyContactForm({ property }) {
  const { data: session } = useSession();
  const [state, formAction] = useFormState(addMessage, {});

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.submitted) {
      toast.success(state.message || "Message sent successfully");
    }
  }, [state]);

  if (!session) return null;

  if (!property?.owner) {
    return (
      <p className="text-red-500">
        Error: Property owner information is missing.
      </p>
    );
  }

  return state.submitted ? (
    <p className="text-green-500 mb-4 text-center">Message sent successfully!</p>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={formAction} className="space-y-4">
        <input
          type="hidden"
          name="receipient"
          value={property.owner?.toString() || ""}
        />
        <input
          type="hidden"
          name="property"
          defaultValue={property._id}
        />
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        {/* Message */}
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
            Message:
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="Enter your message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44"
          />
        </div>
        {/* Button */}
        <div>
          <SubmittedMessageButton />
        </div>
      </form>
    </div>
  );
}

export default PropertyContactForm;
