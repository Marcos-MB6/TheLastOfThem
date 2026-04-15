using Mapster;

namespace TheLastOfThem.Api.Extensions
{
    public static class MapsterExtensions
    {
        public static IServiceCollection AddConfigurations(this IServiceCollection services, IConfiguration config)
        {
            TypeAdapterConfig.GlobalSettings.Default.MaxDepth(3);
            TypeAdapterConfig.GlobalSettings.Default.PreserveReference(true);

            return services;
        }
    }
}