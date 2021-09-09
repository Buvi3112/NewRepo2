using ServerSideApplication.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServerSideApplication.Controllers
{
    [Route("api/Customer")]
    public class CustomersController : ApiController
    {
        OnlineBankingEntities db = new OnlineBankingEntities();
        AccountDetailsTable account = new AccountDetailsTable();
        TransactionsTable transactionsTable = new TransactionsTable();
        TransactionHistoryTable transaction = new TransactionHistoryTable();
        AdminController admin = new AdminController();
        ExportController ex = new ExportController();

        [HttpPost]
        [Route("api/Customer/WithDraw")]
        public HttpResponseMessage PostWithdrawAmount(decimal accountNumber, decimal amount)
        {
            var userName = db.AccountDetailsTables.SingleOrDefault(m => m.AccNumber == accountNumber);
            if (amount < userName.CurrentBalance && userName.Freeze_UnFreeze != "Freeze")
            {
                Random r = new Random();
                float f = r.Next(100000000, 999999999);
                transactionsTable.TransactionId = (decimal)f;
                transactionsTable.TransactionType = "Withdraw";
                transactionsTable.AccNumber = accountNumber;
                transactionsTable.FromName = userName.FirstName;
                transactionsTable.Amount = amount;
                transactionsTable.Date = DateTime.Today;
                transactionsTable.Status = "Success";
                db.TransactionsTables.Add(transactionsTable);
                db.SaveChanges();
                ex.UserDetails(transactionsTable.TransactionId);
                TransationHistoryWithDraw(accountNumber, amount);
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "error");
            }
        }


        public void TransationHistoryWithDraw(decimal accountNumber, decimal Amount)
        {
            Random r = new Random();
            float f = r.Next(100000000, 999999999);
            var userName = db.AccountDetailsTables.SingleOrDefault(m => m.AccNumber == accountNumber);
            transaction.HistoryKey = (decimal)f;
            transaction.AccNumber = accountNumber;
            transaction.Date = DateTime.Today;
            transaction.DebitAmount = Amount;
            transaction.Balance = userName.CurrentBalance - Amount;
            userName.CurrentBalance = userName.CurrentBalance - Amount;
            db.TransactionHistoryTables.Add(transaction);
            db.SaveChanges();
        }

        public void TransationHistoryDeposit(decimal accountNumber, decimal Amount)
        {
            TransactionHistoryTable transactionHistory = new TransactionHistoryTable();
            Random r = new Random();
            float f = r.Next(100000000, 999999999);
            var userName = db.AccountDetailsTables.SingleOrDefault(m => m.AccNumber == accountNumber);
            transactionHistory.HistoryKey = (decimal)f;
            transactionHistory.AccNumber = accountNumber;
            transactionHistory.Date = DateTime.Today;
            transactionHistory.CreditAmount = Amount;
            transactionHistory.Balance = userName.CurrentBalance + Amount;
            userName.CurrentBalance = userName.CurrentBalance + Amount;
            db.TransactionHistoryTables.Add(transactionHistory);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("api/Customer/Deposit")]
        public HttpResponseMessage PostDepositAmount(decimal accountNumber, decimal amount)
        {
            var userName = db.AccountDetailsTables.SingleOrDefault(m => m.AccNumber == accountNumber);
            if (userName.Freeze_UnFreeze != "Freeze")
            {
                Random r = new Random();
                float f = r.Next(100000000, 999999999);
                transactionsTable.TransactionId = (decimal)f;
                transactionsTable.TransactionType = "Deposit";
                transactionsTable.AccNumber = accountNumber;
                transactionsTable.ToName = userName.FirstName;
                transactionsTable.Amount = amount;
                transactionsTable.Date = DateTime.Today;
                transactionsTable.Status = "Success";
                db.TransactionsTables.Add(transactionsTable);
                db.SaveChanges();
                ex.UserDetails(transactionsTable.TransactionId);
                TransationHistoryDeposit(accountNumber, amount);
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "error");
            }
        }

        [HttpPost]
        [Route("api/Customer/Transfer")]
        public HttpResponseMessage PostTransferAmount(decimal FromaccountNumber, decimal ToaccountNumber, decimal amount)
        {
            
            var userName = db.AccountDetailsTables.SingleOrDefault(m => m.AccNumber == FromaccountNumber);
            var userName1 = db.AccountDetailsTables.SingleOrDefault(m => m.AccNumber == ToaccountNumber);
            if (amount < userName.CurrentBalance && userName.Freeze_UnFreeze != "Freeze")
            {
                Random r = new Random();
                float f = r.Next(100000000, 999999999);
                transactionsTable.TransactionId = (decimal)f;
                transactionsTable.TransactionType = "Transfer";
                transactionsTable.AccNumber = FromaccountNumber;
                transactionsTable.FromAccNumber = FromaccountNumber;
                transactionsTable.ToAccNumber = ToaccountNumber;
                transactionsTable.FromName = userName.FirstName;
                transactionsTable.ToName = userName1.FirstName;
                transactionsTable.Date = DateTime.Today;
                transactionsTable.Status = "Success";
                db.TransactionsTables.Add(transactionsTable);
                db.SaveChanges();
                ex.UserDetails(transactionsTable.TransactionId);
                TransationHistoryWithDraw(FromaccountNumber, amount);
                TransationHistoryDeposit(ToaccountNumber, amount);
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Error");
            }
        }



        [HttpGet]
        [Route("api/Customer/Transactions")]
        public IQueryable<TransactionsTable> GetData(decimal accountNumber)
        {
            return db.TransactionsTables.Where(x=>x.AccNumber == accountNumber);
        }



        [HttpPost]
        [Route("api/Customer/Queries")]
        public HttpResponseMessage QueryTable(decimal accountNumber, string query)
        {
            Random r = new Random();
            float f = r.Next(100000000, 999999999);
            QueryTable queryTable = new QueryTable();
            queryTable.AccNumber = accountNumber;
            queryTable.Query = query;
            queryTable.TicketNumber = (decimal)f;
            queryTable.Date = DateTime.Today;
            db.QueryTables.Add(queryTable);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }


        [HttpGet]
        [Route("api/Customer/GetQuery")]
        public IQueryable<QueryTable> GetQuery(decimal accountNumber)
        {
            return db.QueryTables.Where(x => x.AccNumber == accountNumber);
        }


        [HttpPost]
        [Route("api/Customer/Password")]
        public HttpResponseMessage PasswordChange(string username, string password)
        {
            var data = db.Users.SingleOrDefault(x => x.UserName == username);
            data.Password = password;
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }
    }
}
