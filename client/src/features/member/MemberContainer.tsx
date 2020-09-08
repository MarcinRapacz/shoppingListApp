import React from "react";
import MemberForm from "./MemberForm";
import { IShoppingList } from "../shoppingList/IShoppingList";
import MemberList from "./MemberList";

interface Props {
  shoppingList: IShoppingList;
  handleVisibility: (isVisible: boolean) => void;
}

const MemberContainer: React.FC<Props> = (props: Props) => {
  const hideMemberContainer = () => {
    props.handleVisibility(false);
  };

  return (
    <section className={`MemberContainer`}>
      <MemberForm handleVisibility={hideMemberContainer} />
      <MemberList
        members={props.shoppingList.members}
        handleVisibility={hideMemberContainer}
      />
    </section>
  );
};

export default MemberContainer;
