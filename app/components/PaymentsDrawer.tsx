import React from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

type PaymentsDrawerProps = {
  children: React.ReactNode;
};

export default function PaymentsDrawer({ children }: PaymentsDrawerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <Drawer
      isOpen={
        location.pathname === "/payments/add" ||
        location.pathname === "/payments/edit/1"
      }
      placement="right"
      onClose={navigateToPayments}
    >
      <DrawerOverlay />
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
