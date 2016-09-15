import React from "react";

import TextInput from "../../containers/text_input";
import DesignFilesBox from "../../containers/design_files";
import Confirmation from "../../../confirmation/containers/main";
import Heading from "../../components/category_heading";
import DropDown from"../../containers/dropdown";
import { setCoating, setPaperQuality, setQuantity, COATING, PAPER_QUALITY, QUANTITY } from "../../actions/index";

const VisitingCard = ({ coatList, paperQualityList, quantityList, fieldsLabel }) => {
  return (
        <div className='main-section-body'>
          <div className='left-panel'>
            <Heading category={fieldsLabel.category} />
            <DropDown
              itemList={paperQualityList}
              category={PAPER_QUALITY}
              onSelect={setPaperQuality}
            />
            <DropDown
              itemList={coatList}
              category={COATING}
              onSelect={setCoating}
            />
            <TextInput
              onUpdate={setQuantity}
              category={QUANTITY}
            />
            <DesignFilesBox />
          </div>
          <div className='right-panel'>
            <Confirmation fieldsLabel={fieldsLabel} />
          </div>
        </div>
      );
}

export default VisitingCard;
