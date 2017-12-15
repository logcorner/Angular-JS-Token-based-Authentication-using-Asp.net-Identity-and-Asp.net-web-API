using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AspNetWebApiAngularJsAuthenticationToken.Startup))]

namespace AspNetWebApiAngularJsAuthenticationToken
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}