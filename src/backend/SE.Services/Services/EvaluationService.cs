using Microsoft.EntityFrameworkCore;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Services
{
    public class EvaluationService : BaseService
    {
        private readonly DataContext _dataContext;
        public EvaluationService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


    }

}
