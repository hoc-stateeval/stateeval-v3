using FluentAssertions;
using SE.Core.Commands;
using SE.Core.Commands.Evaluations;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Common;
using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SE.API.Tests.Utils
{
    public class TestHelpers
    {
        public static WorkAreaContextDTO FindWorkAreaWithTagName(List<WorkAreaContextDTO> list, WorkAreaType workAreaType)
        {
            return list.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(workAreaType));
        }
    }
}
