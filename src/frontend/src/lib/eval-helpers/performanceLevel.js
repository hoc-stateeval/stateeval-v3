const PerformanceLevels = [
  {
    name: 'UNSATISFACTORY',
    shortName: 'UNS',
    value: 1
   },
   { 
     name: 'BASIC',
     shortName: 'BAS',
     value: 2
   },
   {
     name: 'PROFICIENT',
     shortName: 'PRO',
     value: 3
   },
   {
     name: 'DISTINGUISHED',
     shortName: 'DIS',
     value: 4
   }
  ];

  const mapPerformanceLevelToShortName = (performanceLevel) => {
    return PerformanceLevels.find(x=>x.value===performanceLevel).shortName;
  }

const mapPerformanceLevelToRubricDescriptor = (rubricRow, performanceLevel) => {
  return rubricRow[`pL${performanceLevel.toString()}Descriptor`];
}

export {
  PerformanceLevels,
  mapPerformanceLevelToShortName,
  mapPerformanceLevelToRubricDescriptor
}
