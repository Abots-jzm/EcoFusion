"use client";

import CreateStoreModal from "@/components/dashboard/CreateStoreModal";
import React, { useState } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <CreateStoreModal isOpen={isOpen} closeModal={closeModal} mustComplete />
  );
}

export default Dashboard;
