using WineProject.Services.Authorization.Models;

namespace WineProject.Sevices.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
