//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServerSideApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TransactionHistoryTable
    {
        public decimal HistoryKey { get; set; }
        public System.DateTime Date { get; set; }
        public decimal AccNumber { get; set; }
        public Nullable<decimal> DebitAmount { get; set; }
        public Nullable<decimal> CreditAmount { get; set; }
        public decimal Balance { get; set; }
    }
}