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
    public class UpdateUserPromptCommandValidator
    : AbstractValidator<UpdateUserPromptCommand>
    {
        public UpdateUserPromptCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class UpdateUserPromptCommand :
        IRequest<Unit>
    {
        public long PromptId { get; set; }
        public string Prompt { get; set; }
        public bool Required { get; set; }

        public UpdateUserPromptCommand(
            long promptId,
            string prompt,
            bool required
            )
        {
            PromptId = promptId;
            Prompt = prompt;
            Required = required;
        }
    }


    public class UpdateUserPromptCommandHandler :
        IRequestHandler<UpdateUserPromptCommand,
        Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateUserPromptCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateUserPromptCommand request, CancellationToken cancellationToken)
        {
            UserPrompt prompt = await _dataContext.UserPrompts
                  .Where(x => x.Id == request.PromptId)
                  .FirstOrDefaultAsync();

            if (prompt == null)
            {
                throw new NotFoundException(nameof(UserPrompt), request.PromptId);
            }

            prompt.Prompt = request.Prompt;

            UserPromptTierConfig config = await _dataContext.UserPromptTierConfigs
                .Where(x => x.UserPromptId == request.PromptId && x.ConfigurationTier == prompt.OwnerTier)
                .FirstOrDefaultAsync();

            if (config == null)
            {
                throw new NotFoundException(nameof(UserPromptTierConfig), $"{prompt.Id} {prompt.OwnerTier}");
            }
  
            config.Required = request.Required;

            await _dataContext.SaveChangesAsync();

            return Unit.Value;

        }
    }

}
