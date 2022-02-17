
import { 
  Stack,
} from "@mui/material";

import PackagedEvidenceList from "./PackagedEvidenceList";
import { PageSectionHeader } from "@components";



const PackagedEvidenceSection = () => {
  return (
    <>
      <Stack spacing={2}>
        <PageSectionHeader title={"Packaged Evidence"}></PageSectionHeader>
        <PackagedEvidenceList/>
        </Stack>
    </>
  )
};

export default PackagedEvidenceSection;