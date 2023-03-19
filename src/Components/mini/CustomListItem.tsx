/* eslint-disable no-mixed-operators */
import { Text, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";


type onSelectedType = (item: AttributeProps) => void;
export interface CustomListItemProps {
  attributes: AttributeProps;
  onSelected?: onSelectedType;
}

export interface AttributeProps {
  title: string;
  icon?: any;
  path?: string;
  paths: string[];
  selected?: boolean;
}

export default function CustomListItem(props: CustomListItemProps) {

  return (
    <Button
      isActive={props?.attributes?.selected}
      bg="transparent"
      borderRadius={"0px"}
      onClick={(e) => props?.onSelected && props?.onSelected(props?.attributes)}
      display="flex"
      minW="full"
      textAlign={"start"}
      justifyContent="space-between"
    >
      <Flex minW={"fit-content"} display="flex">
        {props?.attributes?.icon}
        <Text ms="3" fontSize="small">
          {props?.attributes?.title || "Untitled"}
        </Text>
      </Flex>
      <FaChevronRight size={"10"} />
    </Button>
  );
}
