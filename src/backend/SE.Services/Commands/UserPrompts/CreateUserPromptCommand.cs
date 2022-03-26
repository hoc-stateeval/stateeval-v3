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
    public class CreateUserPromptCommandValidator
    : AbstractValidator<CreateUserPromptCommand>
    {
        public CreateUserPromptCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class CreateUserPromptCommand : 
        IRequest<UserPromptDTO>
    {
        public long FrameworkContextId { get; set; }

        public UserPromptTier OwnerTier { get; set; }
        public string SchoolCode { get; set; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; }

        public long? EvaluatorId { get; set; }
        public long? ObservationId { get; set; }
        public long? EvaluationId { get; set; }
        public bool Required { get; set; }

        public CreateUserPromptCommand(
            long frameworkContextId,
            string schoolCode,
            UserPromptTier ownerTier,
            UserPromptType promptType,
            string prompt,
            bool required,
            long? evaluatorId,
            long? observationId,
            long? evaluationId
            )
        {
            FrameworkContextId = frameworkContextId;
            SchoolCode = schoolCode;
            EvaluatorId = evaluatorId;
            OwnerTier = ownerTier;
            PromptType = promptType;
            Prompt = prompt;
            Required = required;
            EvaluationId = evaluationId;
            ObservationId = observationId;
        }
    }


    public class CreateUserPromptCommandHandler : 
        IRequestHandler<CreateUserPromptCommand, 
        UserPromptDTO>
    {
        private readonly DataContext _dataContext;
        public CreateUserPromptCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserPromptDTO> Handle(CreateUserPromptCommand request, CancellationToken cancellationToken)
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
            prompt.SchoolCode = request.SchoolCode;
            prompt.PromptType = request.PromptType;
            prompt.OwnerTier = request.OwnerTier;
            prompt.ObservationId = request.ObservationId;
            prompt.EvaluationId = request.EvaluationId;
            prompt.EvaluatorId = request.EvaluatorId;

            _dataContext.UserPrompts.Add(prompt);

            await _dataContext.SaveChangesAsync();

            UserPromptTierConfig config = new UserPromptTierConfig();
            config.UserPromptId = prompt.Id;
            config.ConfigurationTier = request.OwnerTier;
            config.Required = request.Required;
            config.SchoolCode = request.SchoolCode;
            config.EvaluatorId = request.EvaluatorId;

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
