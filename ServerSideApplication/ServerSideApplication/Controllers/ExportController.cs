using ServerSideApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using ClosedXML;
using ClosedXML.Excel;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ServerSideApplication.Controllers
{
    public class ExportController : ApiController
    {
        OnlineBankingEntities db = new OnlineBankingEntities();
        DataTable dt;

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Excel/Export")]
        public string DataTableToJSONWithJSONNet()
        {
            var acc = db.TransactionsTables;
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(acc);
            dt = (DataTable)JsonConvert.DeserializeObject(JSONString, (typeof(DataTable)));
            ClosedXML.Excel.XLWorkbook wbook = new ClosedXML.Excel.XLWorkbook();
            wbook.Worksheets.Add(dt, "Account");
            HttpResponse httpResponse = HttpContext.Current.Response;
            httpResponse.Clear();
            httpResponse.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            httpResponse.AddHeader("content-disposition", "attachment;filename=\"AccountDetailsTables.xlsx\"");
            using (MemoryStream memoryStream = new MemoryStream())
            {
                wbook.SaveAs(memoryStream);
                memoryStream.WriteTo(httpResponse.OutputStream);
                memoryStream.Close();
            }
                    httpResponse.End();
                    return "Success";
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/ExcelSheet/Export")]
        public void Try(decimal account)
        {
            var acc = db.AccountDetailsTables.Where(x => x.AccNumber == account);
            try
            {
                XLWorkbook Workbook = new XLWorkbook(@"C:\Users\Buvana\FullStack\ExcelFiles\AccountDetails.xlsx");
                IXLWorksheet Worksheet = Workbook.Worksheet("tab1");
                int NumberOfLastRow = Worksheet.LastRowUsed().RowNumber();
                IXLCell CellForNewData = Worksheet.Cell(NumberOfLastRow + 1, 1);
                CellForNewData.InsertData(acc);

                Workbook.Save();
            }
            catch (DirectoryNotFoundException)
            {
                Console.WriteLine( "error");
            }

            

        }

        public void UserDetails(decimal id)
        {
            var user = db.TransactionsTables.Where(x => x.TransactionId == id);
            try
            {
                XLWorkbook Workbook = new XLWorkbook(@"C:\Users\Buvana\FullStack\ExcelFiles\TransactionTables.xlsx");
                IXLWorksheet Worksheet = Workbook.Worksheet("Account");
                int NumberOfLastRow = Worksheet.LastRowUsed().RowNumber();
                IXLCell CellForNewData = Worksheet.Cell(NumberOfLastRow + 1, 1);
                CellForNewData.InsertData(user);
                


                Workbook.Save();
            }
            catch (DirectoryNotFoundException)
            {
                Console.WriteLine("error");
            }



        }

    }
}
