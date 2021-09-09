using Microsoft.Owin.Host.SystemWeb;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServerSideApplication.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security;

namespace ServerSideApplication.Models
{
    public class APIAuthorization : OAuthAuthorizationServerProvider
    {

        MembershipManager membershipManager = new MembershipManager();
        RoleManager roleManager = new RoleManager();
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (UserAuthentication OBJ = new UserAuthentication())
            {
                var user = OBJ.ValidateUser(context.UserName, context.Password);
                String[] role = roleManager.GetRolesForUser(context.UserName);
                String userRole = role[0].ToString();
                if (!user)
                {
                    context.SetError("invalid_grant", "Username or password is incorrect");
                    return;
                }
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Role, userRole));
                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                var additionalData = new AuthenticationProperties(new Dictionary<string, string>{
                    {
                        "role", Newtonsoft.Json.JsonConvert.SerializeObject(userRole)
                    }
                });
                var token = new AuthenticationTicket(identity, additionalData);
                context.Validated(token);
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }


        
    }
}