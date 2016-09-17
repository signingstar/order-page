import React from "react";

import Heading from "../../components/category_heading";
import DropDown from "../../containers/dropdown";
import TextInput from "../../containers/text_input";
import Checkbox from "../../containers/checkbox";
import DesignFilesBox from "../../containers/design_files";
import Confirmation from "../../../confirmation/containers/main";
import { setCoating, setPaperQuality, setQuantity, setTemplate, COATING, PAPER_QUALITY, QUANTITY, TEMPLATE } from "../../actions/index";

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
            <Checkbox
              onUpdate={setTemplate}
              category={TEMPLATE}
            />
          </div>
          <div className='right-panel'>
            <Confirmation fieldsLabel={fieldsLabel} />
          </div>
        </div>
      );
}

export default VisitingCard;
