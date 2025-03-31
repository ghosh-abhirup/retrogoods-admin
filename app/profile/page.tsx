"use client";

import Button from "@/components/common/Button";
import useUserStore from "@/store/UserStore";
import React from "react";

const Profile = () => {
  const { user } = useUserStore();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile</h1>

      {user ? (
        <div className="mx-auto w-1/2 flex flex-col items-center gap-6">
          <div className="field-row">
            <div className="field">
              <p>Firstname</p>
              <p>{user.firstname}</p>
            </div>
            <div className="field">
              <p>Lastname</p>
              <p>{user.lastname}</p>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <p>Email</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          <p className="my-6 font-medium text-gray-700 ">User not logged in</p>

          {/* <div className="flex items-center gap-4">
            <Button click={}>Login to Retrogoods</Button>
          </div> */}
        </div>
      )}
      {/* <div className="w-full flex items-center justify-center mt-5">
        <Button click={}>Log out</Button>
      </div> */}
    </div>
  );
};

export default Profile;
