using GoogleApi.Entities.Places.Search.Text.Response;
using ServerSideApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace ServerSideApplication.Controllers
{
    public class UsersController : ApiController
    {
        MembershipManager membershipManager = new MembershipManager();
        RoleManager roleManager = new RoleManager();


        [HttpGet]
        //[Route("api/Users/Credentials")]
        public HttpResponseMessage GetCredentialsCheck(User user)
        {
            var identity = (ClaimsIdentity)User.Identity;
            var roles = identity.Claims
                        .Where(c => c.Type == ClaimTypes.Role)
                        .Select(c => c.Value);

            String[] details = { identity.Name, roles.ToString() };

            
            return Request.CreateResponse(HttpStatusCode.OK , details);
        }

        [HttpGet]
        [Route("api/Users/UserCheck")]
        public String UserCheck(String username, String password)
        {
            String userRole="";
            if (username!= null && password!= null && membershipManager.ValidateUser(username, password))
            {
                String[] roles = roleManager.GetRolesForUser(username);
                userRole = roles[0].ToString();
               
            }
            else
            {
                 userRole = "incorrect Values";
            }
            return userRole;
        }



    }
}
