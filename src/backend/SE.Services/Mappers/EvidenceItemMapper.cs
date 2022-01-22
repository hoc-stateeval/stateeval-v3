using SE.Core.Common;
using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Mappers
{
    public static partial class Mapper
    {
        public static EvidenceItemDTO MapToEvidenceItemDTO(this EvidenceItem source)
        {
            EvidenceItemDTO target = new EvidenceItemDTO();
            target.Id = source.Id;
            target.EvidenceCollectionType = (EvidenceCollectionType)source.EvidenceCollectionType;
            target.EvidenceCollectionObjectId = source.EvidenceCollectionObjectId;
            target.EvidenceText = source.EvidenceText;
            target.EvidenceTypeDisplayName = EnumUtils.MapEvidenceTypeToDisplayName(source.EvidenceType);
            target.CreatedByDisplayName = $"{source.CreatedByUser.FirstName} {source.CreatedByUser.LastName}";
            target.EvidenceCollectionDisplayName = EnumUtils.MapEvidenceCollectionTypeToDisplayName(source);
            target.EvidenceType = source.EvidenceType;
            target.CreationDateTime = source.CreationDateTime;
            target.CreationDateDisplayString = source.CreationDateTime.ToShortDateString();
            target.CreatedByUserId = source.CreatedByUserId;
            target.RubricRowId = source.RubricRowId;

            target.EvaluationId = source.EvaluationId;
    
            return target;
        }
    }
}
