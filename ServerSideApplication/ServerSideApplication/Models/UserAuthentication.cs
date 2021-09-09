using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerSideApplication.Models
{
    public class UserAuthentication : IDisposable
    {
        public bool ValidateUser(string username, string password)
        {
            using (var context = new OnlineBankingEntities())
            {
                var checkUser = context.Users.Any(x => x.UserName == username && x.Password == password);
                return checkUser;
            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}