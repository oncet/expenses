import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import React from "react";

type PaymentsTableProps = {
  children: React.ReactNode;
};

export default function PaymentsTable({ children }: PaymentsTableProps) {
  return (
    <TableContainer>
      <Table size="sm" variant="striped">
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
}
