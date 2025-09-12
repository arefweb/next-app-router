"use client";

function WebsiteFooter() {
  return (
    <div className="flex justify-center p-6 bg-gray-900 text-white">
      ©{(new Date()).getFullYear()} Aref Movahedzadeh. All rights reserved
    </div>
  );
}

export default WebsiteFooter;