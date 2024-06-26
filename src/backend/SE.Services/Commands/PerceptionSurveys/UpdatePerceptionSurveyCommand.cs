﻿using System;
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

namespace SE.Core.Commands.PerceptionSurveys
{
    public class UpdatePerceptionSurveyCommandValidator
    : AbstractValidator<UpdatePerceptionSurveyCommand>
    {
        public UpdatePerceptionSurveyCommandValidator()
        {
        }
    }
    
    /// <summary>
    /// The command object to update a perception survey
    /// </summary>
    public sealed class UpdatePerceptionSurveyCommand : 
        IRequest<Unit>
    {
        /// <summary>
        /// The survey Id
        /// </summary>
        public long SurveyId { get; set; }
        /// <summary>
        /// The survey title
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// The survey work state
        /// </summary>
        public WfState WfState { get; set; }

        public UpdatePerceptionSurveyCommand(long surveyId, string title, WfState wfState)
        {
            SurveyId = surveyId;
            Title = title;
            WfState = wfState; 
        }
    }

    public class UpdatePerceptionSurveyCommandHandler :
    IRequestHandler<UpdatePerceptionSurveyCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdatePerceptionSurveyCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdatePerceptionSurveyCommand request, CancellationToken cancellationToken)
        {
            PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
                   .Where(x => x.Id == request.SurveyId)
                   .FirstOrDefaultAsync();

            if (survey == null)
            {
                throw new NotFoundException(nameof(PerceptionSurvey), request.SurveyId);
            }

            survey.Title = request.Title;
            survey.WfState = request.WfState;

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
