import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";
import {SortableContainer, SortableElement} from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);
const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});
console.log("아이템! : " + SortableItem);
console.log("리스트! : " + SortableList);

class SortableComponent extends Component {
  state = {
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableComponent;
