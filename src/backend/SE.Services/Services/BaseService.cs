
using Microsoft.Extensions.DependencyInjection; 
using NetCore.AutoRegisterDi;

namespace SE.Core.Services
{
    public static class NetCoreDiSetupExtensions
    {
        public static void RegisterServiceLayerDi
            (this IServiceCollection services)
        {
            services.RegisterAssemblyPublicNonGenericClasses()
                .Where(c => c.Name.EndsWith("Service"))
                .AsPublicImplementedInterfaces();
        }
    }

    public abstract class BaseService
    {
    }
}