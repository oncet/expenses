import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

export default function View() {
  return (
    <>
      <Heading as="h2">October</Heading>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>8000</Td>
            </Tr>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>8000</Td>
            </Tr>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>8000</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
