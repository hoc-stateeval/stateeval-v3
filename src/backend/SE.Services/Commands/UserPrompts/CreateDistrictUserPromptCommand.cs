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
    public class CreateDistrictUserPromptCommandValidator
    : AbstractValidator<CreateDistrictUserPromptCommand>
    {
        public CreateDistrictUserPromptCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class CreateDistrictUserPromptCommand : 
        IRequest<UserPromptDTO>
    {
        public long FrameworkContextId { get; set; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; }
        public bool Required { get; set; }

        public CreateDistrictUserPromptCommand(
            long frameworkContextId,
            UserPromptType promptType,
            string prompt,
            bool required
            )
        {
            FrameworkContextId = frameworkContextId;
            PromptType = promptType;
            Prompt = prompt;
            Required = required;
        }
    }


    public class CreateDistrictUserPromptCommandHandler : 
        IRequestHandler<CreateDistrictUserPromptCommand, 
        UserPromptDTO>
    {
        private readonly DataContext _dataContext;
        public CreateDistrictUserPromptCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserPromptDTO> Handle(CreateDistrictUserPromptCommand request, CancellationToken cancellationToken)
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
            prompt.OwnerTier = UserPromptTier.DISTRICT_ADMIN;

            _dataContext.UserPrompts.Add(prompt);

            await _dataContext.SaveChangesAsync();

            UserPromptTierConfig config = new UserPromptTierConfig();
            config.UserPromptId = prompt.Id;
            config.ConfigurationTier = UserPromptTier.DISTRICT_ADMIN;
            config.Required = request.Required;

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
