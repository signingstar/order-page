import React from "react";

import DesignFilesBox from "../../containers/design_files";
import Confirmation from "../../../confirmation/containers/main";
import Heading from "../../components/category_heading";
import DropDown from"../../containers/dropdown";
import { setCoating, setFold, setPaperQuality, setQuantity, COATING, FOLD, PAPER_QUALITY, QUANTITY } from "../../actions/index";

const Broucher = ({ foldList, coatList, paperQualityList, quantityList, fieldsLabel }) => {
  return (
        <div className='main-section-body'>
          <div className='left-panel'>
            <Heading category={fieldsLabel.category} />
            <DropDown
              itemList={foldList}
              category={FOLD}
              onSelect={setFold} />
            <DropDown
              itemList={paperQualityList}
              category={PAPER_QUALITY}
              onSelect={setPaperQuality} />
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

export default Broucher;
