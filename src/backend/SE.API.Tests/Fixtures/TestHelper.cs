using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.API.Tests.Fixtures
{
    public class TestHelper : WebApplicationFactory<Startup>
    {
        private readonly Dictionary<string, AuthenticatedUserDTO> _usersMap = new Dictionary<string, AuthenticatedUserDTO>();
        private readonly Dictionary<long, FrameworkContextDTO> _frameworkContextsMap = new Dictionary<long, FrameworkContextDTO>();
        private readonly Dictionary<string, FrameworkNodeDTO> _frameworkNodesMap = new Dictionary<string, FrameworkNodeDTO>();
        private readonly Dictionary<string, RubricRowDTO> _rubricRowsMap = new Dictionary<string, RubricRowDTO>();
        private readonly IServiceScopeFactory _scopeFactory;

        private DataContext _dataContext;
        public HttpClient Client;

        public EvaluationsManager EvaluationsManager { get; }
        public UserManager UserManager { get; }
        public District Seattle { get; }
        public District DAN { get; }
        public District MAR { get; }
        public District CEL { get; }
        public District MAR2 { get; }
        public District CEL2 { get; }
        public SpecialUsers SpecialUsers { get; }
        public District DefaultDistrict { get { return DAN; } }
        public School DefaultSchool { get { return DefaultDistrict.DefaultSchool; } }
        public TestUser Teacher { get { return DefaultSchool.TeacherA; } }
        public TestUser Principal { get { return DefaultSchool.PrincipalA; } }
        public TestUser SchoolAdmin { get { return DefaultSchool.SchoolAdmin; } }
        public TestUser DistrictAdmin { get { return DefaultDistrict.DistrictAdmin; } }
        public TestUser DistrictViewer { get { return DefaultDistrict.DistrictViewer; } }
        public TestUser DTE { get { return DefaultDistrict.DTE; } }
        public TestUser DistrictAssignmentManager { get { return DefaultDistrict.DistrictAssignmentManager; } }
        public TestUser DistrictEvaluator { get { return DefaultDistrict.DistrictEvaluator; } }
        public TestUser HeadPrincipal { get { return DefaultSchool.HeadPrincipal; } }

        public TestHelper()
        {
            _dataContext = CreateDataContext();
            Client = CreateDefaultClient();

            _scopeFactory = Services.GetRequiredService<IServiceScopeFactory>();

            this.EvaluationsManager = new EvaluationsManager(_dataContext);
            this.UserManager = new UserManager(_dataContext);

            DAN = new District(DistrictNames.DAN, DistrictCodes.DAN);
            CEL = new District(DistrictNames.CEL, DistrictCodes.CEL);
            MAR = new District(DistrictNames.MAR, DistrictCodes.MAR);
            Seattle = new District(DistrictNames.Seattle, DistrictCodes.Seattle);

            MAR2 = new District(DistrictNames.MAR2, DistrictCodes.MAR2);
            CEL2 = new District(DistrictNames.CEL2, DistrictCodes.CEL2);

            SpecialUsers = new SpecialUsers(this);
        }

        public async Task<T> ExecuteScopeAsync<T>(Func<IServiceProvider, Task<T>> action)
        {
            using var scope = _scopeFactory.CreateScope();
            var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

            try
            {
                var result = await action(scope.ServiceProvider);
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Task<T> ExecuteDbContextAsync<T>(Func<IMediator, Task<T>> action)
            => ExecuteScopeAsync(sp => action(sp.GetService<IMediator>()));


        public Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            return ExecuteScopeAsync(sp =>
            {
                var mediator = sp.GetRequiredService<IMediator>();

                return mediator.Send(request);
            });
        }

        public Task SendAsync(IRequest request)
        {
            return ExecuteScopeAsync(sp =>
            {
                var mediator = sp.GetRequiredService<IMediator>();

                return mediator.Send(request);
            });
        }

        public async Task<AuthenticatedUserDTO> GetAuthenticatedUserAsync(TestUser user)
        {
            GetAuthenticatedUserByUserNameQuery cmd = new GetAuthenticatedUserByUserNameQuery(user.UserName);
            return await SendAsync(cmd);
        }

        public WorkAreaContextDTO GetWorkAreaByTagName(AuthenticatedUserDTO user, WorkAreaType workArea)
        {
            return user.WorkAreas.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(workArea));
        }

        async public Task<WorkAreaContextDTO> GetWorkAreaAsync(TestUser testUser, WorkAreaType wa)
        {
            AuthenticatedUserDTO user;
            if (!_usersMap.ContainsKey(testUser.UserName))
            {
                user = await GetAuthenticatedUserAsync(testUser);
                _usersMap[user.UserName] = user;
            }
            user = _usersMap[testUser.UserName];

            return user.WorkAreas.Find(x => x.DistrictName == testUser.DistrictName && x.TagName == EnumUtils.MapWorkAreaTypeToTagName(wa));
        }

        async public Task<EvaluateeDTO> GetEvaluateeAsync(TestUser testUser, EvaluationType evalType)
        {
            var user = await GetAuthenticatedUserAsync(testUser);
            GetEvaluateeQuery query = new GetEvaluateeQuery(testUser.DistrictCode, evalType, testUser.SchoolCode, user.Id);
            return await SendAsync(query);
        }

        public async Task<FrameworkContextDTO> GetFrameworkContextAsync(WorkAreaContextDTO wa)
        {
            FrameworkContextDTO fc;
            if (_frameworkContextsMap.ContainsKey(wa.FrameworkContextId))
            {
                return _frameworkContextsMap[wa.FrameworkContextId];
            }
            else
            {
                GetFrameworkContextByIdQuery query = new GetFrameworkContextByIdQuery(wa.DefaultFrameworkId);
                fc = await SendAsync(query);
                _frameworkContextsMap[fc.Id] = fc;
                return fc;
            }
        }

        public async Task<FrameworkNodeDTO> GetFrameworkNodeAsync(WorkAreaContextDTO wa, string shortName)
        {
            if (_frameworkNodesMap.ContainsKey(shortName))
            {
                return _frameworkNodesMap[shortName];
            }
            else
            {
                FrameworkNodeDTO found = null;
                var fc = await GetFrameworkContextAsync(wa);
                foreach (FrameworkNodeDTO fn in fc.StateFramework.FrameworkNodes)
                {
                    if (fn.ShortName == shortName)
                    {
                        _frameworkNodesMap[fn.ShortName] = fn;
                        found = fn;
                        break;

                    }
                }
                return found;
            }
        }

        public async Task<RubricRowDTO> GetRubricRowAsync(WorkAreaContextDTO wa, string shortName)
        {
            if (_rubricRowsMap.ContainsKey(shortName))
            {
                return _rubricRowsMap[shortName];
            }
            else
            {
                RubricRowDTO found = null;
                var fc = await GetFrameworkContextAsync(wa);
                foreach (FrameworkNodeDTO fn in fc.StateFramework.FrameworkNodes)
                {
                    if (found != null) break;

                    foreach (RubricRowDTO rr in fn.RubricRows)
                    {
                        if (rr.ShortName == shortName)
                        {
                            _rubricRowsMap[rr.ShortName] = rr;
                            found = rr;
                            break;
                        }
                    }
                }
                return found;
            }
        }

        private DataContext CreateDataContext()
        {
            var connectionString = "Data Source=localhost;Initial Catalog=stateeval-netcore;Trusted_Connection=True";
            return new DataContext(new DbContextOptionsBuilder<DataContext>().UseSqlServer(connectionString).Options);
        }
    }
}
