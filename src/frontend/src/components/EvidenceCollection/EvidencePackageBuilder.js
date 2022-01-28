import { useSelector } from 'react-redux';

import { 
  Typography,
} from "@mui/material";

import {
  selectSelectedEvidenceItems,
} from "@evidence-collection-slice";

import './evidence-package-builder.css';

const EvidencePackageBuilder = () => {

  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);
  return (
    <>
      <div className="evidence-package-builder">
        <Typography variant="h4">Evidence Package Creation</Typography>
        <div className="subhead">Items demonstrating the claim</div>
        {/*TODO: order by id */}
        <ul class="selected-evidence">
          {selectedEvidenceItems.filter(x=>x.selected).map((next, i)=> {
            return (
              <li className="item-row">
                <div class="index">{i+1}</div>
                <div>{next.evidenceItem.evidenceTypeDisplayName}</div>
              </li>
            )
          })}
      </ul>
      </div>
    </>
  );
};

export default EvidencePackageBuilder;