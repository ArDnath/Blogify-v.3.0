import React from 'react';
import Logout from '../components/Logout';

const CreatePage = () => {
    return (
        <div className="pt-10">
      <h1 className="text-2xl font-bold">Write Page</h1>
      <p className="mt-4">You can write your blog here.</p>
      <div className="mt-6">
        <Logout /> {/* Logout button only accessible here */}
      </div>
    </div>
    );
}

export default CreatePage;
