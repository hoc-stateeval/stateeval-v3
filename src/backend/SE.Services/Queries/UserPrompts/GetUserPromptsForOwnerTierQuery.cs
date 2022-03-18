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
            RuleFor(x => x.OwnerTier).NotEqual(UserPromptOwnerTier.UNDEFINED);
        }
    }
    public sealed class GetUserPromptsForOwnerTierQuery : 
        IRequest<List<UserPromptDTO>>
    {
        public long FrameworkContextId { get; set; }
        public UserPromptType PromptType { get; set; }
        public UserPromptOwnerTier OwnerTier { get;set; }
        public string SchoolCode { get; set; }
        public long UserId { get; set; }

        public GetUserPromptsForOwnerTierQuery(long frameworkContextId, UserPromptOwnerTier ownerTier, long userId)
        {
            FrameworkContextId = frameworkContextId;
            OwnerTier = ownerTier;
            UserId = userId;   
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
                    .Where(x => x.FrameworkContextId == request.FrameworkContextId &&
                                x.PromptType == request.PromptType &&
                                x.OwnerTier <= request.OwnerTier &&
                                (x.OwnerTier == UserPromptOwnerTier.DISTRICT_ADMIN || x.SchoolCode == request.SchoolCode) &&
                                (x.OwnerTier != UserPromptOwnerTier.EVALUATOR || x.CreatedByUserId == request.UserId))
                    .Select(x => x.MapToUserPromptDTO())
                    .ToListAsync();

                return prompts;
            }
        }
    }
}
