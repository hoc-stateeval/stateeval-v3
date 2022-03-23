
import { PerceptionSurveyLevelOfAgreement } from "@lib/enums";

const tableData = [
  {
    levelOfAgreementTitle: 'Strongly Disagree',
    levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.STRONGLY_DISAGREE,
  },
  {
    levelOfAgreementTitle: 'Disagree',
    levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.DISAGREE,
  },
  {
    levelOfAgreementTitle: 'Neither Agree nor Disagree',
    levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.NEITHER,
  },
  {
    levelOfAgreementTitle: 'Agree',
    levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.AGREE,
  },
  {
    levelOfAgreementTitle: 'Strongly Agree',
    levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.STRONGLY_AGREE,
  }
];

export default tableData;