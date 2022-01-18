using Microsoft.EntityFrameworkCore;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Core.Common;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SE.Core.Common.Exceptions;

namespace SE.Core.Services
{
    public interface IRubricRowService
    {
        public Task<Unit> CreateObservationNoteEvidence(long rubricRowId, long observationId, string evidenceText, Guid clientId);
        public Task<Unit> CreateRubricRowNoteEvidence(long rubricRowId, long observationId, string evidenceText);
        public Task<Unit> CreateObservationPromptResponseEvidence(long rubricRowId, long observationId, EvidenceType evidenceType, long userPromptResponseId, string evidenceText);
    }

    public class RubricRowService : BaseService, IRubricRowService
    {
        private readonly DataContext _dataContext;
        public RubricRowService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        private EvidenceItem CreateEvidenceItemCore(
            EvidenceCollectionType evidenceCollectionType,
            EvidenceType evidenceType,
            long createdByUserId,
            long rubricRowId, 
            long evidenceCollectionObjectId, 
            long evaluationId)
        {
            return new EvidenceItem()
            {
                EvidenceCollectionType = evidenceCollectionType,
                EvidenceCollectionObjectId = evidenceCollectionObjectId,
                EvaluationId = evaluationId,
                EvidenceType = evidenceType,
                RubricRowId = rubricRowId,
                CreatedByUserId = createdByUserId,
            };
        }

        public async Task<Unit> CreateObservationNoteEvidence(
            long rubricRowId, 
            long observationId, 
            string evidenceText, 
            Guid clientId)
        {
            Observation? observation = await _dataContext.Observations
             .Where(x => x.Id == observationId)
             .FirstOrDefaultAsync();

            if (observation == null)
            {
                throw new NotFoundException(nameof(Observation), observationId);
            }

            EvidenceItem evidenceItem = CreateEvidenceItemCore(
                EvidenceCollectionType.OBSERVATION,
                EvidenceType.RR_ANNOTATION_OBSERVATION_NOTES,
                observation.CreatedByUserId, 
                rubricRowId, 
                observation.Id, 
                observation.EvaluationId);

            evidenceItem.EvidenceText = evidenceText;
            evidenceItem.ObservationNoteClientId = clientId;

            await _dataContext.EvidenceItems.AddAsync(evidenceItem);
            await _dataContext.SaveChangesAsync();

            return Unit.Value;
        }

        public async Task<Unit> CreateRubricRowNoteEvidence(
             long rubricRowId,
             long observationId,
             string evidenceText)
        {
            Observation? observation = await _dataContext.Observations
             .Where(x => x.Id == observationId)
             .FirstOrDefaultAsync();

            if (observation == null)
            {
                throw new NotFoundException(nameof(Observation), observationId);
            }

            EvidenceItem evidenceItem = CreateEvidenceItemCore(
                EvidenceCollectionType.OBSERVATION,
                EvidenceType.RR_ANNOTATION_RUBRIC_NOTE,
                observation.CreatedByUserId,
                rubricRowId,
                observation.Id,
                observation.EvaluationId);

            evidenceItem.EvidenceText = evidenceText;

            await _dataContext.EvidenceItems.AddAsync(evidenceItem);
            await _dataContext.SaveChangesAsync();

            return Unit.Value;
        }

        // evidenceText contains the full response text with a single embedded coding.
        public async Task<Unit> CreateObservationPromptResponseEvidence(
             long rubricRowId,
             long observationId,
             EvidenceType evidenceType,
             long userPromptResponseId,
             string evidenceText)
        {
            Observation? observation = await _dataContext.Observations
               .Where(x => x.Id == observationId)
               .FirstOrDefaultAsync();

            if (observation == null)
            {
                throw new NotFoundException(nameof(Observation), observationId);
            }


            UserPromptResponse? userPromptResponse = await _dataContext.UserPromptResponses
             .Where(x => x.Id == userPromptResponseId)
             .FirstOrDefaultAsync();

            if (userPromptResponse == null)
            {
                throw new NotFoundException(nameof(UserPromptResponse), userPromptResponse.Id);
            }

            EvidenceItem evidenceItem = CreateEvidenceItemCore(
                EvidenceCollectionType.OBSERVATION,
                evidenceType,
                observation.CreatedByUserId,
                rubricRowId,
                observation.Id,
                observation.EvaluationId);

            evidenceItem.EvidenceText = evidenceText;
            evidenceItem.UserPromptResponseId = userPromptResponse.Id;

            await _dataContext.EvidenceItems.AddAsync(evidenceItem);
            await _dataContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
