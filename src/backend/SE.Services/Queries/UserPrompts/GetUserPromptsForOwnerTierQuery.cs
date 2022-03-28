using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using SE.Core.Common;
using SE.Core.Mappers;

namespace SE.Core.Queries.UserPrompts
{
    public class GetUserPromptsForOwnerTierQueryValidator
    : AbstractValidator<GetUserPromptsForOwnerTierQuery>
    {
        public GetUserPromptsForOwnerTierQueryValidator()
        {
        }
    }
    public sealed class GetUserPromptsForOwnerTierQuery : 
        IRequest<List<UserPromptDTO>>
    {
        public long FrameworkContextId { get; set; }
        public UserPromptType PromptType { get; set; }
        public UserPromptTier OwnerTier { get;set; }
        public string SchoolCode { get; set; }
        public long? EvaluatorId { get; set; }

        public GetUserPromptsForOwnerTierQuery(long frameworkContextId, UserPromptTier ownerTier, UserPromptType promptType, string schoolCode, long? evaluatorId)
        {
            FrameworkContextId = frameworkContextId;
            OwnerTier = ownerTier;
            EvaluatorId = evaluatorId;   
            SchoolCode = schoolCode;
            PromptType = promptType;
        }

        internal sealed class GetUserPromptsForOwnerTierQueryHandler : 
            IRequestHandler<GetUserPromptsForOwnerTierQuery, List<UserPromptDTO>>
        {
            private readonly DataContext _dataContext;
            public GetUserPromptsForOwnerTierQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<UserPromptDTO>> Handle(GetUserPromptsForOwnerTierQuery request, CancellationToken cancellationToken)
            {
                var prompts = await _dataContext.UserPrompts
                    .Include(x => x.TierConfigs)
                    .Where(x => x.FrameworkContextId == request.FrameworkContextId &&
                                x.PromptType == request.PromptType &&
                                x.OwnerTier <= request.OwnerTier &&
                                (x.OwnerTier == UserPromptTier.DISTRICT_ADMIN || x.SchoolCode == request.SchoolCode) &&
                                (x.OwnerTier != UserPromptTier.EVALUATOR || x.EvaluatorId == request.EvaluatorId))
                    .Select(x => x.MapToUserPromptDTO())
                    .ToListAsync();

                return prompts;
            }
        }
    }
}
