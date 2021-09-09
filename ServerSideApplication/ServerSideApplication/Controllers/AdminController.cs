using ServerSideApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServerSideApplication.Controllers
{
    [Route("api/Admin")]
    public class AdminController : ApiController
    {

        OnlineBankingEntities db = new OnlineBankingEntities();
        AccountDetailsTable account = new AccountDetailsTable();
        ExportController ex = new ExportController();

        [HttpPost]
        [Route("api/Admin/CreateAccount")]
        public HttpResponseMessage PostCreateAccount([FromBody] AccountDetailsTable acc)
        {
            using (var accountDB = new OnlineBankingEntities())
            {
                //Random r = new Random();
                //float f = r.Next(100000000, 999999999);
                Boolean a = false;
                decimal f;
                while(!a)
                {
                    f = Data();
                    if(!(db.AccountDetailsTables.Any(x => x.AccNumber == f)))
                    {
                        a = true;
                        acc.AccNumber = f;
                    }
                    
                }
                acc.CurrentBalance = 1000;
                acc.AccountCreationDate = DateTime.Today;
                acc.MaxTransactionLimitPerDay = 2000000;
                acc.Freeze_UnFreeze = "UnFreeze";
                accountDB.AccountDetailsTables.Add(acc);
                String username = acc.AccNumber.ToString();
                String password = "customer";
                accountDB.SaveChanges();
                
                //ex.UserDetails(acc.AccNumber);
                PostCreateUser(username, password);
                ex.Try(acc.AccNumber);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }

        [HttpGet]
        [Route("api/Admin/Random")]
        public HttpResponseMessage GetAccRandom()
        {
            using (var check = new OnlineBankingEntities())
            {
                Random r = new Random();
                float f = r.Next(100000000, 999999999);
                return Request.CreateResponse(HttpStatusCode.OK, f);
            }
        }

        [HttpPut]
        [Route("api/Admin/FreezeAccount")]
        public HttpResponseMessage PutFreezeUnfreeze(decimal accNumber, String FreezeUnfreeze)
        {
            var newDetails = db.AccountDetailsTables.SingleOrDefault(x => x.AccNumber == accNumber);
            
            newDetails.Freeze_UnFreeze = FreezeUnfreeze;
            
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }

        
        [HttpGet]
        [Route("api/Admin/AccountDetails")]
        public IHttpActionResult GetAccountDetails(decimal accountNumber)
        {
            
            //var details = db.AccountDetailsTables.Find(accountNumber);
            AccountDetailsTable table = new AccountDetailsTable();
            table = db.AccountDetailsTables.Find(accountNumber);
            if (table != null)
                {
                return Ok(table);
            }
                else
                {
                return NotFound();
            }
            
        }


        [HttpPut]
        [Route("api/Admin/UpdateAccount")]
        public HttpResponseMessage PutUpdateAccount(decimal accNumber, [FromBody] AccountDetailsTable acc)
        {
            var newDetails = db.AccountDetailsTables.SingleOrDefault(x => x.AccNumber == accNumber);
            newDetails.FirstName = acc.FirstName;
            newDetails.LastName = acc.LastName;
            newDetails.Address = acc.Address;
            newDetails.PhoneNumber = acc.PhoneNumber;
            newDetails.Age = acc.Age;
            newDetails.DOB = acc.DOB;
            newDetails.Gender = acc.Gender;
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }

        [HttpDelete]
        [Route("api/Admin/DeleteAccount")]
        public HttpResponseMessage DeleteAccount(decimal accNumber)
        {
            var data = db.AccountDetailsTables.Find(accNumber);
            var user = db.Users.Find(accNumber.ToString());
            if (data != null)
            {
                db.AccountDetailsTables.Remove(data);
                db.Users.Remove(user);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "error");
            }
        }


        [HttpPost]
        [Route("api/Admin/CreateUser")]
        public HttpResponseMessage PostCreateUser(String username, String password)
        {
            User user = new User();
            if(password == "admin")
            {
                user.UserName = username;
                user.Password = password;
                user.RoleId = 3;
                db.Users.Add(user);
                
                
            }
            else
            {
                user.UserName = username;
                user.Password = password;
                user.RoleId = 4;
                db.Users.Add(user);
                
                
            }
            db.SaveChanges();
            CreateRoleUser(username);
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }


        public void CreateRoleUser(String username)
        {
            UserInRole inRole = new UserInRole();
            var userRoles = db.Users.SingleOrDefault(x => x.UserName == username);
            inRole.UserId = userRoles.UserId;
            inRole.RoleId = userRoles.RoleId;
            db.UserInRoles.Add(inRole);
            db.SaveChanges();
        }


        [HttpGet]
        [Route("api/Admin/GetQuery")]
        public IQueryable<QueryTable> GetQuery()
        {
            return db.QueryTables.Where(x => x.Answer == null);
        }


        [HttpPost]
        [Route("api/Admin/Queries")]
        public HttpResponseMessage QueryTable(decimal ticketNumber, string answer, String username)
        {
            var data = db.QueryTables.SingleOrDefault(x => x.TicketNumber == ticketNumber);
            data.Answer = answer;
            data.GivenBy = username;
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }

        public decimal Data()
        {
            Random r = new Random();
            float f = r.Next(100000000, 999999999);
            return (decimal)f;
        }
    }
}
