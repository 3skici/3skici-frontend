import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {user, status} = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');


  if (status === 'loading') {
    return <p>Loading. . .</p>
  }

  // validate if the user exist or not 
  if (!user) {
    return <p>You are not logged in</p>
  }

  const handleChangePassword = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error updating password');
      }
      setPasswordMessage(data.message);
    } catch (error) {
      setPasswordMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col items-center space-y-4">
          <FaUserCircle className="text-gray-600 text-9xl" />
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-gray-500">@{user?.username}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Full Name:</span>
              <span className="text-gray-800">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Username:</span>
              <span className="text-gray-800">{user?.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Member Since:</span>
              <span className="text-gray-800">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleChangePassword}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              Change Password
            </button>
            {passwordMessage && <p className="text-red-500 mt-2">{passwordMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
