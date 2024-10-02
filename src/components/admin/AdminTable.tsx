import { Table, ScrollArea, Text } from "@mantine/core";
import { memo } from "react";

interface IProps {
  rows: [];
  columnArray: string[];
  loading: string | boolean;
}

const AdminTable = memo(({ rows, columnArray, loading }: IProps) => {
  return (
    <>
      {loading === true || loading === "loading" ? (
        <Text size="xl">Загрузка...</Text>
      ) : (
        <ScrollArea h={"80vh"} miw={"100%"} mx="auto" offsetScrollbars>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            mt="md"
			fz="lg"
            verticalSpacing="xs"
          >
            <Table.Thead>
              <Table.Tr>
                {columnArray.map((item, index) => {
                  return <Table.Th key={index}>{item}</Table.Th>;
                })}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </>
  );
});

export default AdminTable;