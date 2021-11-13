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

namespace SE.Core.Queries
{
    public class GetFrameworkByIdQueryValidator
    : AbstractValidator<GetFrameworkByIdQuery>
    {
        public GetFrameworkByIdQueryValidator()
        {
        }
    }
    public sealed class GetFrameworkByIdQuery : 
        IRequest<FrameworkDTO>
    {
        public long Id { get; }

        public GetFrameworkByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetFrameworkByIdQueryHandler : 
            IRequestHandler<GetFrameworkByIdQuery, FrameworkDTO>
        {
            private readonly DataContext _dataContext;
            public GetFrameworkByIdQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<FrameworkDTO> Handle(GetFrameworkByIdQuery request, CancellationToken cancellationToken)
            {
                Framework? framework = await _dataContext.Frameworks
                    .Include(x => x.FrameworkNodes).ThenInclude(x => x.FrameworkNodeRubricRows).ThenInclude(x=>x.RubricRow)
                    .Where(x => x.Id == request.Id).FirstOrDefaultAsync();

                FrameworkDTO frameworkDTO = new FrameworkDTO()
                {
                    Id = framework.Id,
                    Name = framework.Name,
                    FrameworkNodes = framework.FrameworkNodes.Select(fn => new FrameworkNodeDTO()
                    {
                        Id = fn.Id,
                        FrameworkId = framework.Id,
                        ShortName = fn.ShortName,
                        Title = fn.Title,
                        IsStudentGrowthAligned = fn.IsStudentGrowthAligned,
                        Sequence = fn.Sequence,
                        RubricRows = fn.FrameworkNodeRubricRows
                        .OrderBy(x => x.Sequence)
                        .Select(fnrr => fnrr.RubricRow)
                        .Select(rr => new RubricRowDTO()
                        {
                            Id = rr.Id,
                            ShortName = rr.ShortName,
                            Title = rr.Title,
                            FrameworkNodeShortName = fn.ShortName,
                            IsStudentGrowthAligned = rr.IsStudentGrowthAligned,
                            PL1Descriptor = rr.PL1Descriptor,
                            PL2Descriptor = rr.PL2Descriptor,
                            PL3Descriptor = rr.PL3Descriptor,
                            PL4Descriptor = rr.PL4Descriptor,
                            LookFor1 = rr.LookFor1,
                            LookFor2 = rr.LookFor2,
                            LookFor3 = rr.LookFor3,
                            LookFor4 = rr.LookFor4
                        }).ToList()
                    }).ToList()
                };

                return await Task.FromResult(frameworkDTO);
            }
        }
    }
}
