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
using SE.Core.Common.Exceptions;
using SE.Core.Common;

namespace SE.Core.Commands
{
    public class UpdateSchoolConfigurationCommandValidator
    : AbstractValidator<UpdateSchoolConfigurationCommand>
    {
        public UpdateSchoolConfigurationCommandValidator()
        {
            RuleFor(x=>x.Id).NotEmpty();
        }
    }
    public sealed class UpdateSchoolConfigurationCommand : 
        IRequest<IResponse<Unit>>
    {
        public long Id{ get; }
        public bool EvaluationSetupDelegated { get; }

        public UpdateSchoolConfigurationCommand(long id, bool evaluationSetupDelegated)
        {
            Id = id;
            EvaluationSetupDelegated = evaluationSetupDelegated;    
        }
    }

    public class UpdateSchoolConfigurationCommandHandler :
    IRequestHandler<UpdateSchoolConfigurationCommand, IResponse<Unit>>
    {
        private readonly DataContext _dataContext;
        public UpdateSchoolConfigurationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<Unit>> Handle(UpdateSchoolConfigurationCommand request, CancellationToken cancellationToken)
        {
            SchoolConfiguration? config = await _dataContext.SchoolConfigurations
                   .Where(x => x.Id == request.Id)
                   .FirstOrDefaultAsync();

            if (config == null)
            {
                throw new NotFoundException(nameof(SchoolConfiguration), request.Id);
            }

            config.EvaluationSetupDelegated = request.EvaluationSetupDelegated;
            _dataContext.SaveChanges();

            return Response.Success(Unit.Value);
        }
    }
}
