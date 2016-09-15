import React from "react";

import DesignFilesBox from "../../containers/design_files";
import Confirmation from "../../../confirmation/containers/main";
import Heading from "../../components/category_heading";
import DropDown from"../../containers/dropdown";
import { setCoating, setQuantity, setSize, setSurface, COATING, QUANTITY, SIZE, SURFACE } from "../../actions/index";

const LetterHead = ({filterList, fieldsLabel}) => {
  let { sizeList, materialList, coatList, quantityList } = filterList;

  return (
    <div className='main-section-body'>
      <div className='left-panel'>
        <Heading category={fieldsLabel.category} />
        <DropDown
          itemList={sizeList}
          category={SIZE}
          onSelect={setSize} />
        <DropDown
          itemList={materialList}
          category={SURFACE}
          onSelect={setSurface} />
        <DropDown
          itemList={coatList}
          category={COATING}
          onSelect={setCoating} />
        <DropDown
          itemList={quantityList}
          category={QUANTITY}
          onSelect={setQuantity} />
        <DesignFilesBox />
      </div>
      <div className='right-panel'>
        <Confirmation fieldsLabel={fieldsLabel} />
      </div>
    </div>
  );
}

export default LetterHead;
