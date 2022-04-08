using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Core.Common;
using SE.Core.Common.Exceptions;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Commands.UserPrompts
{
    public class CreateSchoolUserPromptCommandValidator
    : AbstractValidator<CreateSchoolUserPromptCommand>
    {
        public CreateSchoolUserPromptCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class CreateSchoolUserPromptCommand : 
        IRequest<UserPromptDTO>
    {
        public long FrameworkContextId { get; set; }
        public string SchoolCode { get; set; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; }
        public bool Required { get; set; }

        public CreateSchoolUserPromptCommand(
            long frameworkContextId,
            string schoolCode,
            UserPromptType promptType,
            string prompt,
            bool required
            )
        {
            FrameworkContextId = frameworkContextId;
            PromptType = promptType;
            Prompt = prompt;
            Required = required;
            SchoolCode = schoolCode;
        }
    }


    public class CreateSchoolUserPromptCommandHandler : 
        IRequestHandler<CreateSchoolUserPromptCommand, 
        UserPromptDTO>
    {
        private readonly DataContext _dataContext;
        public CreateSchoolUserPromptCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserPromptDTO> Handle(CreateSchoolUserPromptCommand request, CancellationToken cancellationToken)
        {
            FrameworkContext frameworkContext = await _dataContext.FrameworkContexts
                  .Where(x => x.Id == request.FrameworkContextId)
                  .FirstOrDefaultAsync();

            if (frameworkContext == null)
            {
                throw new NotFoundException(nameof(FrameworkContext), request.FrameworkContextId);
            }

            UserPrompt prompt = new UserPrompt();
            prompt.Prompt = request.Prompt;
            prompt.FrameworkContextId = request.FrameworkContextId;
            prompt.PromptType = request.PromptType;
            prompt.OwnerTier = UserPromptTier.SCHOOL_ADMIN;
            prompt.SchoolCode = request.SchoolCode;

            _dataContext.UserPrompts.Add(prompt);

            await _dataContext.SaveChangesAsync();

            UserPromptTierConfig config = new UserPromptTierConfig();
            config.UserPromptId = prompt.Id;
            config.ConfigurationTier = UserPromptTier.DISTRICT_ADMIN;
            config.Required = request.Required;
            config.SchoolCode = request.SchoolCode;

            _dataContext.UserPromptTierConfigs.Add(config);

            await _dataContext.SaveChangesAsync();

            prompt = await _dataContext.UserPrompts
                .Include(x=>x.TierConfigs)
                .Where(x => x.Id == prompt.Id)
                .FirstAsync();

            return prompt.MapToUserPromptDTO();

        }
    }

}
